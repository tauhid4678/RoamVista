import React, { useState, useEffect } from 'react';
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
import api from '../../services/api';

export const UserDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Load traveler's bookings from backend API
  const fetchMyBookings = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/bookings/my-bookings');
      if (res.data?.data) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load reservations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    setIsCancelling(true);

    try {
      const bookingId = selectedBooking._id || selectedBooking.id;
      await api.put(`/bookings/${bookingId}/cancel`);
      toast.success('Reservation cancelled successfully.');
      setCancelModalOpen(false);
      setSelectedBooking(null);
      fetchMyBookings();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to cancel reservation.';
      toast.error(msg);
    } finally {
      setIsCancelling(false);
    }
  };

  const bookingColumns = [
    {
      key: 'id',
      label: 'Reference',
      sortable: true,
      render: (_, row) => (
        <span className="font-mono text-[11px] font-bold text-sand-700 dark:text-sand-300">
          {row._id ? `BK-${row._id.slice(-6).toUpperCase()}` : row.id}
        </span>
      )
    },
    {
      key: 'tourTitle',
      label: 'Expedition',
      sortable: true,
      render: (_, row) => (
        <span className="font-semibold text-sand-900 dark:text-sand-100">
          {row.tour?.title || row.tourTitle || 'Custom Expedition'}
        </span>
      )
    },
    {
      key: 'departureDate',
      label: 'Departure',
      sortable: true,
      render: (val) => val || 'TBD'
    },
    {
      key: 'guests',
      label: 'Guests',
      sortable: false,
      align: 'center',
      render: (val) => `${val || 1} Explorer(s)`
    },
    {
      key: 'totalPrice',
      label: 'Total',
      sortable: true,
      align: 'right',
      render: (val) => `$${Number(val || 0).toLocaleString()}`
    },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (val) => (
        <Badge
          variant={
            val === 'Confirmed'
              ? 'primary'
              : val === 'Completed'
              ? 'success'
              : val === 'Cancelled'
              ? 'danger'
              : 'secondary'
          }
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
            onClick={() =>
              toast.info(
                `Viewing departure notes for ${row.tour?.title || 'Expedition'}.`
              )
            }
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

  // Dynamic Metrics Calculated from Real Database Data
  const totalBookingsCount = bookings.length;
  const upcomingDeparturesCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const completedJourneysCount = bookings.filter((b) => b.status === 'Completed').length;
  const totalInvestedAmount = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + (Number(b.totalPrice) || 0), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary-700 via-primary-600 to-primary-800 text-sand-50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="secondary" size="sm" className="mb-2">
            Traveler Dashboard
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">
            Welcome back, {user?.name || 'Explorer'}
          </h1>
          <p className="text-xs sm:text-sm text-sand-200 mt-1 max-w-lg font-light">
            Manage your expedition itineraries, review gear checklists, and track your global footprint.
          </p>
        </div>
        <Link to="/explore">
          <Button
            variant="secondary"
            size="md"
            icon={<Compass className="w-4 h-4" />}
          >
            Book New Expedition
          </Button>
        </Link>
      </div>

      {/* Overview Cards (Dynamic metrics from database) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-sand-500 font-semibold uppercase tracking-wider">Booked Trips</p>
            <h3 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-50">
              {totalBookingsCount}
            </h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-100 dark:bg-accent-950/60 text-accent-700 dark:text-accent-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-sand-500 font-semibold uppercase tracking-wider">Upcoming Departures</p>
            <h3 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-50">
              {upcomingDeparturesCount}
            </h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-sand-500 font-semibold uppercase tracking-wider">Completed Journeys</p>
            <h3 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-50">
              {completedJourneysCount}
            </h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-earth-100 dark:bg-earth-950/60 text-earth-600 dark:text-earth-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-sand-500 font-semibold uppercase tracking-wider">Total Invested</p>
            <h3 className="text-2xl font-serif font-bold text-sand-900 dark:text-sand-50">
              ${totalInvestedAmount.toLocaleString()}
            </h3>
          </div>
        </Card>
      </div>

      {/* My Bookings Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-bold text-sand-900 dark:text-sand-50">
              My Expedition Reservations
            </h2>
            <p className="text-xs text-sand-500">
              Live database tracking of upcoming departures, status lifecycle, and concierge notes.
            </p>
          </div>
          <Badge variant="primary">{bookings.length} Total Bookings</Badge>
        </div>

        <Table
          columns={bookingColumns}
          data={bookings}
          isLoading={isLoading}
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
          <p className="text-xs text-sand-600 dark:text-sand-300">
            Selected reservation:{' '}
            <strong>
              {selectedBooking?._id
                ? `BK-${selectedBooking._id.slice(-6).toUpperCase()}`
                : selectedBooking?.id}
            </strong>{' '}
            ({selectedBooking?.tour?.title || selectedBooking?.tourTitle}).
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setCancelModalOpen(false)}>
            Keep Reservation
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleCancelBooking}
            disabled={isCancelling}
          >
            {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserDashboard;
