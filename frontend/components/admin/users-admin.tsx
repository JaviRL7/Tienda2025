'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { adminApi, type Usuario } from '@/lib/api';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import toast from 'react-hot-toast';

export default function UsersAdmin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    rol: 'user',
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    try {
      const response = await adminApi.usuarios.getAll();
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUser(usuario);
    setFormData({
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol || 'user',
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingUser) return;

    try {
      await adminApi.usuarios.actualizar(editingUser.id, formData);
      toast.success('Usuario actualizado exitosamente');
      setIsDialogOpen(false);
      loadUsuarios();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar el usuario');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    try {
      await adminApi.usuarios.eliminar(id);
      toast.success('Usuario eliminado exitosamente');
      loadUsuarios();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar el usuario');
    }
  };

  const toggleRole = async (usuario: Usuario) => {
    const newRole = usuario.rol === 'admin' ? 'user' : 'admin';

    try {
      await adminApi.usuarios.actualizar(usuario.id, { rol: newRole });
      toast.success(`Usuario ${newRole === 'admin' ? 'promovido a admin' : 'degradado a usuario'}`);
      loadUsuarios();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al cambiar el rol del usuario');
    }
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="p-2 rounded-full bg-primary/10">
              <UserIcon className="h-5 w-5 text-primary" />
            </div>
            Gestión de Usuarios
            <Badge variant="secondary">{usuarios.length} usuarios</Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.nombre}</TableCell>
                <TableCell>{usuario.correo}</TableCell>
                <TableCell>
                  <Badge variant={usuario.rol === 'admin' ? 'default' : 'secondary'}>
                    {usuario.rol === 'admin' ? (
                      <>
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </>
                    ) : (
                      <>
                        <UserIcon className="h-3 w-3 mr-1" />
                        Usuario
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRole(usuario)}
                      title={usuario.rol === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                    >
                      {usuario.rol === 'admin' ? (
                        <UserIcon className="h-4 w-4" />
                      ) : (
                        <Shield className="h-4 w-4" />
                      )}
                    </Button>
                    <Dialog open={isDialogOpen && editingUser?.id === usuario.id} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(usuario)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Editar Usuario</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                              id="nombre"
                              value={formData.nombre}
                              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="correo">Correo</Label>
                            <Input
                              id="correo"
                              type="email"
                              value={formData.correo}
                              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="rol">Rol</Label>
                            <Select value={formData.rol} onValueChange={(value) => setFormData({ ...formData, rol: value })}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">Usuario</SelectItem>
                                <SelectItem value="admin">Administrador</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={handleSave} className="w-full">
                            Actualizar Usuario
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(usuario.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}