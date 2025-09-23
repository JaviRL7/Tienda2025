'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Tag as TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { adminApi, type GaleriaTag } from '@/lib/api';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import toast from 'react-hot-toast';

export default function GalleryAdmin() {
  const [tags, setTags] = useState<GaleriaTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTag, setEditingTag] = useState<GaleriaTag | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const response = await adminApi.galeriaTags.getAll();
      setTags(response.data);
    } catch (error) {
      console.error('Error loading gallery tags:', error);
      toast.error('Error al cargar las etiquetas de galería');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tag: GaleriaTag) => {
    setEditingTag(tag);
    setFormData({
      nombre: tag.nombre,
      descripcion: tag.descripcion || '',
    });
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingTag(null);
    setFormData({
      nombre: '',
      descripcion: '',
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingTag) {
        await adminApi.galeriaTags.actualizar(editingTag.id, formData);
        toast.success('Etiqueta actualizada exitosamente');
      } else {
        await adminApi.galeriaTags.crear(formData);
        toast.success('Etiqueta creada exitosamente');
      }

      setIsDialogOpen(false);
      loadTags();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al guardar la etiqueta');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta etiqueta?')) {
      return;
    }

    try {
      await adminApi.galeriaTags.eliminar(id);
      toast.success('Etiqueta eliminada exitosamente');
      loadTags();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al eliminar la etiqueta');
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
              <TagIcon className="h-5 w-5 text-primary" />
            </div>
            Gestión de Etiquetas de Galería
            <Badge variant="secondary">{tags.length} etiquetas</Badge>
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleCreate}
                className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nueva Etiqueta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingTag ? 'Editar Etiqueta' : 'Crear Etiqueta'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre de la Etiqueta</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej: Trabajos, Taller, Momentos"
                  />
                </div>
                <div>
                  <Label htmlFor="descripcion">Descripción (Opcional)</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Describe el tipo de contenido de esta etiqueta..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleSave} className="w-full">
                  {editingTag ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {tags.length === 0 ? (
          <div className="text-center py-16">
            <TagIcon className="h-16 w-16 text-primary/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No hay etiquetas creadas
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Crea etiquetas para organizar las imágenes de la galería en diferentes categorías
            </p>
            <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Crear Primera Etiqueta
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {tag.nombre}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-muted-foreground truncate">
                      {tag.descripcion || 'Sin descripción'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(tag)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(tag.id)}
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
        )}
      </CardContent>
    </Card>
  );
}