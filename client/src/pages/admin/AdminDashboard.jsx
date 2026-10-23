import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  Map,
  Users,
  Calendar,
  DollarSign,
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Card, Button, Badge, Table, Modal, Input, Textarea } from '../../components/common';
import { MOCK_TOURS } from '../../data/mockTours';
import { useToast } from '../../context/ToastContext';

export const AdminDashboard = () => {
  const toast = useToast();

  const [tours, setTours] = useState(MOCK_TOURS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);

  // Form state for Create/Edit
  const [tourForm, setTourForm] = useState({
    title: '',
    category: 'Alpine Trekking',
    location: '',
    price: '',
    durationDays: '',
    maxGroupSize: '10',
    summary: '',
  });

  // Recharts Real Dynamic Series Data
  const monthlyRevenueData = [
    { month: 'May', revenue: 78000, bookings: 14 },
    { month: 'Jun', revenue: 112000, bookings: 22 },
    { month: 'Jul', revenue: 165000, bookings: 31 },
    { month: 'Aug', revenue: 198000, bookings: 38 },
    { month: 'Sep', revenue: 142000, bookings: 26 },
    { month: 'Oct', revenue: 147500, bookings: 28 },
  ];

  const userGrowthData = [
    { month: 'May', travelers: 1420 },
    { month: 'Jun', travelers: 1680 },
    { month: 'Jul', travelers: 1950 },
    { month: 'Aug', travelers: 2150 },
    { month: 'Sep', travelers: 2320 },
    { month: 'Oct', travelers: 2450 },
  ];

  const categoryDistributionData = [
    { name: 'Alpine Trekking', value: 35, color: '#0F382C' },
    { name: 'Wildlife Safari', value: 25, color: '#C5A869' },
    { name: 'Cultural Heritage', value: 20, color: '#B56847' },
    { name: 'Coastal Sailing', value: 12, color: '#5F9E87' },
    { name: 'Arctic Expedition', value: 8, color: '#9E8038' },
  ];

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newTour = {
      id: 'tour-' + Date.now(),
      slug: tourForm.title.toLowerCase().replace(/\s+/g, '-'),
      title: tourForm.title,
      category: tourForm.category,
      location: tourForm.location,
      price: Number(tourForm.price) || 3500,
      durationDays: Number(tourForm.durationDays) || 7,
      maxGroupSize: Number(tourForm.maxGroupSize) || 10,
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: false,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      summary: tourForm.summary || 'A newly curated wilderness journey with master naturalists.',
      gallery: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'],
      highlights: ['Custom route curated by regional masters'],
      itinerary: [{ day: 1, title: 'Arrival & Welcome Dinner', details: 'Private transfer to boutique lodge.' }],
      inclusions: ['All meals and boutique accommodations'],
      exclusions: ['International airfare']
    };

    setTours([newTour, ...tours]);
    toast.success(`Expedition "${tourForm.title}" added to catalog.`);
    setIsCreateModalOpen(false);
    setTourForm({
      title: '',
      category: 'Alpine Trekking',
      location: '',
      price: '',
      durationDays: '',
      maxGroupSize: '10',
      summary: '',
    });
  };

  const handleEditOpen = (tour) => {
    setSelectedTour(tour);
    setTourForm({
      title: tour.title,
      category: tour.category,
      location: tour.location,
      price: tour.price.toString(),
      durationDays: tour.durationDays.toString(),
      maxGroupSize: tour.maxGroupSize.toString(),
      summary: tour.summary,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTours((prev) =>
      prev.map((t) =>
        t.id === selectedTour.id
          ? {
              ...t,
              title: tourForm.title,
              category: tourForm.category,
              location: tourForm.location,
              price: Number(tourForm.price),
              durationDays: Number(tourForm.durationDays),
              maxGroupSize: Number(tourForm.maxGroupSize),
              summary: tourForm.summary,
            }
          : t
      )
    );
    toast.success(`Updated expedition "${tourForm.title}".`);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!tourToDelete) return;
    setTours((prev) => prev.filter((t) => t.id !== tourToDelete.id));
    toast.success(`Expedition "${tourToDelete.title}" removed.`);
    setDeleteModalOpen(false);
    setTourToDelete(null);
  };

  const tourColumns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'durationDays', label: 'Days', sortable: true, align: 'center' },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      align: 'right',
      render: (val) => `$${val.toLocaleString()}`
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
            icon={<Edit className="w-3.5 h-3.5" />}
            onClick={() => handleEditOpen(row)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:text-rose-700"
            icon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={() => {
              setTourToDelete(row);
              setDeleteModalOpen(true);
            }}
          />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Badge variant="secondary" size="sm" className="mb-1">Platform Control Room</Badge>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-sand-900 dark:text-sand-50">
            Administrative Operations & Analytics
          </h1>
          <p className="text-xs text-sand-500 mt-0.5">
            Real-time telemetry, revenue performance, and expedition catalog management.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add New Tour
        </Button>
      </div>

      {/* 4 Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-sand-500 font-semibold uppercase tracking-wider">Active Tours</p>
            <h3 className="text-2xl font-bold font-serif text-sand-900 dark:text-sand-50">{tours.length}</h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-100 dark:bg-accent-950/60 text-accent-700 dark:text-accent-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-sand-500 font-semibold uppercase tracking-wider">Registered Travelers</p>
            <h3 className="text-2xl font-bold font-serif text-sand-900 dark:text-sand-50">2,450</h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-earth-100 dark:bg-earth-950/60 text-earth-600 dark:text-earth-400 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-sand-500 font-semibold uppercase tracking-wider">Total Bookings</p>
            <h3 className="text-2xl font-bold font-serif text-sand-900 dark:text-sand-50">169</h3>
          </div>
        </Card>

        <Card padding="p-5" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-sand-500 font-semibold uppercase tracking-wider">Gross Escrow</p>
            <h3 className="text-2xl font-bold font-serif text-sand-900 dark:text-sand-50">$842,500</h3>
          </div>
        </Card>
      </div>

      {/* Dynamic Recharts Grid (Bar Chart, Line Chart, Pie Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Bar Chart: Monthly Revenue */}
        <Card padding="p-6" className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-sand-900 dark:text-sand-50">Monthly Revenue & Bookings</h3>
              <p className="text-xs text-sand-500">Gross reservation volume in USD</p>
            </div>
            <Badge variant="primary" size="sm">Last 6 Months</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  formatter={(val) => [`$${val.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#141C19', borderColor: '#22322E', color: '#F3F1EC', borderRadius: '12px' }}
                />
                <Bar dataKey="revenue" fill="#0F382C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 2. Pie Chart: Category Distribution */}
        <Card padding="p-6" className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-sand-900 dark:text-sand-50">Tours by Expedition Style</h3>
            <p className="text-xs text-sand-500">Distribution across active themes</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val}%`, name]}
                  contentStyle={{ backgroundColor: '#141C19', borderColor: '#22322E', color: '#F3F1EC', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 3. Line Chart: Traveler Registrations */}
      <Card padding="p-6" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-sand-900 dark:text-sand-50">Traveler Growth Trajectory</h3>
            <p className="text-xs text-sand-500">Cumulative verified member registrations</p>
          </div>
          <Badge variant="secondary" size="sm">+72.5% YoY</Badge>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[1000, 2600]} />
              <Tooltip
                formatter={(val) => [val.toLocaleString(), 'Travelers']}
                contentStyle={{ backgroundColor: '#141C19', borderColor: '#22322E', color: '#F3F1EC', borderRadius: '12px' }}
              />
              <Line type="monotone" dataKey="travelers" stroke="#C5A869" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Manage Tours CRUD Data Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-sand-900 dark:text-sand-50">Expedition Catalog Inventory</h2>
            <p className="text-xs text-sand-500">Full CRUD management of destination packages.</p>
          </div>
          <Badge variant="primary">{tours.length} Items Listed</Badge>
        </div>

        <Table
          columns={tourColumns}
          data={tours}
          emptyMessage="No tours found in catalog."
        />
      </div>

      {/* Create Tour Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Expedition"
        description="Add a handcrafted tour package to the global database catalog."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            id="new-title"
            label="Expedition Title"
            placeholder="e.g. Norwegian Fjords & Midnight Sun"
            value={tourForm.title}
            onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-sand-800 dark:text-sand-200">Category</label>
              <select
                value={tourForm.category}
                onChange={(e) => setTourForm({ ...tourForm, category: e.target.value })}
                className="p-2.5 rounded-xl border border-sand-300 dark:border-darkSurface-700 bg-sand-50 dark:bg-darkSurface-900 text-xs text-sand-900 dark:text-sand-100"
              >
                <option value="Alpine Trekking">Alpine Trekking</option>
                <option value="Wildlife Safari">Wildlife Safari</option>
                <option value="Cultural Heritage">Cultural Heritage</option>
                <option value="Coastal Sailing">Coastal Sailing</option>
                <option value="Arctic Expedition">Arctic Expedition</option>
              </select>
            </div>

            <Input
              id="new-location"
              label="Location"
              placeholder="e.g. Lofoten, Norway"
              value={tourForm.location}
              onChange={(e) => setTourForm({ ...tourForm, location: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              id="new-price"
              type="number"
              label="Price (USD)"
              placeholder="3850"
              value={tourForm.price}
              onChange={(e) => setTourForm({ ...tourForm, price: e.target.value })}
              required
            />
            <Input
              id="new-days"
              type="number"
              label="Duration Days"
              placeholder="8"
              value={tourForm.durationDays}
              onChange={(e) => setTourForm({ ...tourForm, durationDays: e.target.value })}
              required
            />
            <Input
              id="new-group"
              type="number"
              label="Max Group"
              placeholder="10"
              value={tourForm.maxGroupSize}
              onChange={(e) => setTourForm({ ...tourForm, maxGroupSize: e.target.value })}
              required
            />
          </div>

          <Textarea
            id="new-summary"
            label="Expedition Summary"
            placeholder="Brief overview of terrain, lodging, and highlights..."
            value={tourForm.summary}
            onChange={(e) => setTourForm({ ...tourForm, summary: e.target.value })}
            rows={3}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Expedition
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Tour Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Expedition"
        description={`Modifying ${selectedTour?.title}`}
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <Input
            id="edit-title"
            label="Expedition Title"
            value={tourForm.title}
            onChange={(e) => setTourForm({ ...tourForm, title: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-sand-800 dark:text-sand-200">Category</label>
              <select
                value={tourForm.category}
                onChange={(e) => setTourForm({ ...tourForm, category: e.target.value })}
                className="p-2.5 rounded-xl border border-sand-300 dark:border-darkSurface-700 bg-sand-50 dark:bg-darkSurface-900 text-xs text-sand-900 dark:text-sand-100"
              >
                <option value="Alpine Trekking">Alpine Trekking</option>
                <option value="Wildlife Safari">Wildlife Safari</option>
                <option value="Cultural Heritage">Cultural Heritage</option>
                <option value="Coastal Sailing">Coastal Sailing</option>
                <option value="Arctic Expedition">Arctic Expedition</option>
              </select>
            </div>

            <Input
              id="edit-location"
              label="Location"
              value={tourForm.location}
              onChange={(e) => setTourForm({ ...tourForm, location: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Input
              id="edit-price"
              type="number"
              label="Price (USD)"
              value={tourForm.price}
              onChange={(e) => setTourForm({ ...tourForm, price: e.target.value })}
              required
            />
            <Input
              id="edit-days"
              type="number"
              label="Duration Days"
              value={tourForm.durationDays}
              onChange={(e) => setTourForm({ ...tourForm, durationDays: e.target.value })}
              required
            />
            <Input
              id="edit-group"
              type="number"
              label="Max Group"
              value={tourForm.maxGroupSize}
              onChange={(e) => setTourForm({ ...tourForm, maxGroupSize: e.target.value })}
              required
            />
          </div>

          <Textarea
            id="edit-summary"
            label="Expedition Summary"
            value={tourForm.summary}
            onChange={(e) => setTourForm({ ...tourForm, summary: e.target.value })}
            rows={3}
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Tour Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Expedition"
        description="Are you sure you want to delete this expedition?"
      >
        <p className="text-xs text-sand-600 dark:text-sand-300">
          This will permanently remove <strong>{tourToDelete?.title}</strong> from the public catalog and active search queries.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
            Confirm Deletion
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
