import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  ArrowRight,
  Eye,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card, Button, Badge, Table, Modal } from '../../components/common';

export const UserDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Sample User Bookings
  const [bookings, setBookings] = useState([
    {
      id: 'BK-9021',
      tourTitle: 'Patagonia Glaciers & Fjords Expedition',
      departureDate: 'November 15, 2026',
      guests: 2,
      totalPrice: '$8,500',
      status: 'Confirmed',
    },
    {
      id: 'BK-8742',
      tourTitle: 'Kyoto Zen & Ancient Heritage Immersions',
      departureDate: 'March 20, 2027',
      guests: 2,
      totalPrice: '$6,200',
      status: 'Confirmed',
    },
    {
      id: 'BK-7619',
      tourTitle: 'Serengeti & Ngorongoro Great Migration',
      departureDate: 'July 10, 2026',
      guests: 1,
      totalPrice: '$5,890',
      status: 'Completed',
    }
  ]);

  const handleCancelBooking = () => {
    if (!selectedBooking) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === selectedBooking.id ? { ...b, status: 'Cancelled' } : b))
    );
    toast.success(`Booking ${selectedBooking.id} cancelled successfully.`);
    setCancelModalOpen(false);
  };

  const bookingColumns = [
    { key: 'id', label: 'Reference', sortable: true },
    { key: 'tourTitle', label: 'Expedition', sortable: true },
    { key: 'departureDate', label: 'Departure', sortable: true },
    { key: 'guests', label: 'Guests', sortable: false, align: 'center' },
    { key: 'totalPrice', label: 'Total', sortable: true, align: 'right' },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (val) => (
        <Badge
          variant={val === 'Confirmed' ? 'primary' : val === 'Completed' ? 'success' : 'accent'}
          styleType="subtle"
        >
          {val}
        </Badge>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            icon={<Eye className="w-3.5 h-3.5" />}
            onClick={() => toast.info(`Viewing details for ${row.id}`)}
          />
          {row.status === 'Confirmed' && (
            <Button
              variant="ghost"
              size="sm"
              className="text-rose-600 hover:text-rose-700"
              icon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={() => {
                setSelectedBooking(row);
                setCancelModalOpen(true);
              }}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-700 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="primary" styleType="solid" size="sm" className="mb-2 bg-white/20 text-white border-white/20">
            Traveler Dashboard
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome back, {user?.name || 'Explorer'}</h1>
          <p className="text-xs sm:text-sm text-primary-100 mt-1 max-w-lg">
            Manage your expedition itineraries, review gear checklists, and track your global footprint.
          </p>
        </div>
        <Link to="/explore">
          <Button variant="outline" className="bg-white text-primary-900 border-none hover:bg-neutral-100" icon={<Compass className="w-4 h-4" />}>
            Book New Expedition
          </Button>
        </Link>
      </div>

      {/* Overview Cards (Dynamic metrics from backend) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Booked Trips</p>
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">3</h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-100 dark:bg-secondary-950/60 text-secondary-600 dark:text-secondary-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Upcoming Departures</p>
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">2</h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Completed Journeys</p>
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">1</h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-100 dark:bg-accent-950/60 text-accent-600 dark:text-accent-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Total Invested</p>
            <h3 className="text-2xl font-extrabold text-neutral-900 dark:text-white">$20,590</h3>
          </div>
        </Card>
      </div>

      {/* My Bookings Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">My Expedition Reservations</h2>
            <p className="text-xs text-neutral-500">Track and manage upcoming and past travel bookings.</p>
          </div>
          <Badge variant="primary">{bookings.length} Total Bookings</Badge>
        </div>

        <Table
          columns={bookingColumns}
          data={bookings}
          emptyMessage="You have not booked any expeditions yet."
        />
      </div>

      {/* Cancellation Modal */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel Expedition Reservation"
        description="Are you sure you wish to cancel this reservation?"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
            <div>
              <p className="font-bold">Flexible Cancellation Window</p>
              <p className="mt-0.5">
                Cancellations made 60 days prior to departure qualify for 100% refund or deposit transfer to any future expedition.
              </p>
            </div>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Selected reservation: <strong>{selectedBooking?.id}</strong> ({selectedBooking?.tourTitle}).
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setCancelModalOpen(false)}>
            Keep Reservation
          </Button>
          <Button variant="danger" size="sm" onClick={handleCancelBooking}>
            Confirm Cancellation
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserDashboard;
