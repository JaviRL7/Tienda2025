'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { productosApi, adminApi, type Producto } from '@/lib/api';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import toast from 'react-hot-toast';

export default function ProductsAdmin() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    codigoColor: '',
    codigoTintada: '',
    precio: '',
    enPantalla: false,
    img: '',
  });

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const response = await productosApi.getAll();
      setProductos(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (producto: Producto) => {
    setEditingProduct(producto);
    setFormData({
      codigoColor: producto.codigoColor,
      codigoTintada: producto.codigoTintada,
      precio: producto.precio.toString(),
      enPantalla: producto.enPantalla,
      img: producto.img || '',
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      codigoColor: '',
      codigoTintada: '',
      precio: '',
      enPantalla: false,
      img: '',
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        ...formData,
        precio: parseFloat(formData.precio),
      };

      if (editingProduct) {
        await adminApi.productos.actualizar(editingProduct.id, data);
        toast.success('Producto actualizado exitosamente');
      } else {
        await adminApi.productos.crear(data);
        toast.success('Producto creado exitosamente');
      }

      setIsDialogOpen(false);
      loadProductos();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al guardar el producto');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      await adminApi.productos.eliminar(id);
      toast.success('Producto eliminado exitosamente');
      loadProductos();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar el producto');
    }
  };

  const toggleEnPantalla = async (producto: Producto) => {
    try {
      await adminApi.productos.actualizar(producto.id, {
        enPantalla: !producto.enPantalla
      });
      toast.success(producto.enPantalla ? 'Producto ocultado' : 'Producto destacado');
      loadProductos();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al actualizar el producto');
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
              <Plus className="h-5 w-5 text-primary" />
            </div>
            Gestión de Productos
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleCreate}
                className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Editar Producto' : 'Crear Producto'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="codigoColor">Código Color</Label>
                  <Input
                    id="codigoColor"
                    value={formData.codigoColor}
                    onChange={(e) => setFormData({ ...formData, codigoColor: e.target.value })}
                    placeholder="Ej: ROJO-001"
                  />
                </div>
                <div>
                  <Label htmlFor="codigoTintada">Código Tintada</Label>
                  <Input
                    id="codigoTintada"
                    value={formData.codigoTintada}
                    onChange={(e) => setFormData({ ...formData, codigoTintada: e.target.value })}
                    placeholder="Ej: TT-ROJO-001"
                  />
                </div>
                <div>
                  <Label htmlFor="precio">Precio (€)</Label>
                  <Input
                    id="precio"
                    type="number"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="img">URL de Imagen</Label>
                  <Input
                    id="img"
                    value={formData.img}
                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="enPantalla"
                    checked={formData.enPantalla}
                    onCheckedChange={(checked) => setFormData({ ...formData, enPantalla: checked })}
                  />
                  <Label htmlFor="enPantalla">Mostrar en página principal</Label>
                </div>
                <Button onClick={handleSave} className="w-full">
                  {editingProduct ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código Color</TableHead>
              <TableHead>Código Tintada</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell className="font-medium">{producto.codigoColor}</TableCell>
                <TableCell>{producto.codigoTintada}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(producto.precio)}
                </TableCell>
                <TableCell>
                  <Badge variant={producto.enPantalla ? 'default' : 'secondary'}>
                    {producto.enPantalla ? 'Destacado' : 'Oculto'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleEnPantalla(producto)}
                    >
                      {producto.enPantalla ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(producto)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(producto.id)}
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