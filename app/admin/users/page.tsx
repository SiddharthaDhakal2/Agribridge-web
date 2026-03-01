'use client';

import { useEffect, useMemo, useState } from 'react';
import { RotateCw, Search } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { AdminUser, getAdminUsers } from '@/lib/api/admin-users';

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || process.env.BACKEND_URL || 'http://localhost:5000';

  const getImageUrl = useMemo(() => {
    return (image?: string) => {
      if (!image) return '';
      if (image.startsWith('http://') || image.startsWith('https://')) return image;
      return `${baseUrl}${image}`;
    };
  }, [baseUrl]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) => {
      const name = user.name?.toLowerCase() || '';
      const email = user.email?.toLowerCase() || '';
      const phone = user.phone?.toLowerCase() || '';
      const address = user.address?.toLowerCase() || '';

      return (
        name.includes(query) ||
        email.includes(query) ||
        phone.includes(query) ||
        address.includes(query)
      );
    });
  }, [searchQuery, users]);

  const loadUsers = async () => {
    try {
      setIsRefreshing(true);
      setError(null);
      const data = await getAdminUsers();
      setUsers(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load users';
      setError(msg);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAdminUsers();
        setUsers(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to load users';
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users Information</h2>
        </div>
        <Button
          onClick={loadUsers}
          disabled={isRefreshing}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              All Users ({filteredUsers.length}{filteredUsers.length !== users.length ? ` of ${users.length}` : ''})
            </h3>
            <div className="relative w-full sm:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, phone, address..."
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const displayImage = getImageUrl(user.image);
                  const avatarLetter = user.name?.charAt(0)?.toUpperCase() || 'U';

                  return (
                    <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-green-700 text-white flex items-center justify-center">
                            {displayImage ? (
                              <ImageWithFallback
                                src={displayImage}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-sm font-semibold">{avatarLetter}</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role || 'user'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{user.phone || '-'}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        <span className="block max-w-xs truncate">{user.address || '-'}</span>
                      </td>
                    </tr>
                  );
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 px-4 text-center text-sm text-gray-500">
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
