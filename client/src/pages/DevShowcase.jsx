import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Compass,
  Search,
  Sparkles,
  MapPin,
  Clock,
  Star,
  Users,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Modal,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  Table,
  Skeleton,
  TourCardSkeleton
} from '../components/common';

export const DevShowcase = () => {
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [testError, setTestError] = useState('');
  const [tableSort, setTableSort] = useState({ col: 'title', dir: 'asc' });
  const [tablePage, setTablePage] = useState(1);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const sampleTours = [
    { id: 1, title: 'Patagonia Glaciers & Fjords', region: 'Chile & Argentina', duration: '12 Days', price: '$4,250', rating: 4.95, status: 'Active' },
    { id: 2, title: 'Kyoto Zen & Ancient Temples', region: 'Japan', duration: '8 Days', price: '$3,100', rating: 4.92, status: 'Active' },
    { id: 3, title: 'Serengeti Great Migration Safari', region: 'Tanzania', duration: '10 Days', price: '$5,890', rating: 4.98, status: 'Featured' },
    { id: 4, title: 'Amalfi Coast & Capri Yachting', region: 'Italy', duration: '7 Days', price: '$3,750', rating: 4.88, status: 'Active' },
  ];

  const tableColumns = [
    { key: 'title', label: 'Expedition Name', sortable: true },
    { key: 'region', label: 'Destination', sortable: true },
    { key: 'duration', label: 'Duration', sortable: false },
    { key: 'price', label: 'Price', sortable: true, align: 'right' },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (val) => (
        <Badge variant={val === 'Featured' ? 'secondary' : 'primary'}>
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
          <Button variant="ghost" size="sm" icon={<Eye className="w-3.5 h-3.5" />} onClick={() => toast.info(`Viewing ${row.title}`)} />
          <Button variant="ghost" size="sm" icon={<Edit className="w-3.5 h-3.5" />} onClick={() => toast.info(`Editing ${row.title}`)} />
        </div>
      )
    }
  ];

  const handleTestSubmit = (e) => {
    e.preventDefault();
    if (!testInput.trim()) {
      setTestError('Destination name is required for inquiry.');
      toast.error('Validation failed.');
      return;
    }
    setTestError('');
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      toast.success(`Inquiry for "${testInput}" submitted!`);
      setTestInput('');
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
        <strong>Developer Diagnostics / QA Showcase:</strong> This route (<code>/dev-showcase</code>) is isolated for developer component verification. It is not linked in public navigation.
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-serif">Component Library & Token Inspector</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSkeleton(!showSkeleton)}>
            Toggle Skeletons ({showSkeleton ? 'ON' : 'OFF'})
          </Button>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
            Open Test Modal
          </Button>
        </div>
      </div>

      {/* Button & Input Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="p-6" className="space-y-4">
          <CardTitle>Button Variants</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Muted Gold</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button isLoading={true} variant="primary">Loading</Button>
          </div>
        </Card>

        <Card padding="p-6">
          <CardTitle>Form Standards</CardTitle>
          <form onSubmit={handleTestSubmit} className="space-y-3 mt-3">
            <Input
              id="dev-dest"
              label="Test Destination"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              error={testError}
              required
            />
            <Button type="submit" variant="primary" fullWidth size="sm" isLoading={btnLoading}>
              Test Validation Submit
            </Button>
          </form>
        </Card>
      </div>

      {/* Data Table */}
      <Table
        columns={tableColumns}
        data={sampleTours}
        sortColumn={tableSort.col}
        sortDirection={tableSort.dir}
        onSort={(col) => setTableSort((prev) => ({ col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }))}
        currentPage={tablePage}
        totalPages={2}
        onPageChange={(p) => setTablePage(p)}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Test Modal">
        <p className="text-xs text-sand-600 dark:text-sand-300">
          Accessible dialog working with escape key listener and backdrop blur.
        </p>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DevShowcase;
