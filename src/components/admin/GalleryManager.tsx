import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, ArrowUp, ArrowDown, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  display_order: number;
  created_at: string;
}

const GalleryManager = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [newImage, setNewImage] = useState({
    src: "",
    alt: "",
    title: "",
    display_order: 0
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      
      // Create a temporary URL for preview
      const fileUrl = URL.createObjectURL(file);
      setNewImage({ ...newImage, src: fileUrl });
    }
  };

  const uploadFileToLovable = async (file: File): Promise<string> => {
    // Simulate file upload - in a real app, this would upload to a storage service
    // For now, we'll just use the file name and assume it's been uploaded
    const fileName = `${Date.now()}-${file.name}`;
    const fileUrl = `/lovable-uploads/${fileName}`;
    
    // In a real implementation, you would upload the file here
    // For demo purposes, we'll just return a mock URL
    return fileUrl;
  };

  const handleAddImage = async () => {
    try {
      let imageSrc = newImage.src;
      
      if (uploadedFile) {
        // Upload file and get the URL
        imageSrc = await uploadFileToLovable(uploadedFile);
      }

      const { error } = await supabase
        .from('gallery_images')
        .insert([{ 
          ...newImage, 
          src: imageSrc,
          display_order: images.length + 1 
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gallery image added successfully",
      });

      setNewImage({ src: "", alt: "", title: "", display_order: 0 });
      setUploadedFile(null);
      setIsAddDialogOpen(false);
      fetchImages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add gallery image",
        variant: "destructive",
      });
    }
  };

  const handleUpdateImage = async () => {
    if (!editingImage) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          src: editingImage.src,
          alt: editingImage.alt,
          title: editingImage.title,
          display_order: editingImage.display_order
        })
        .eq('id', editingImage.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gallery image updated successfully",
      });

      setEditingImage(null);
      setIsEditDialogOpen(false);
      fetchImages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update gallery image",
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gallery image deleted successfully",
      });

      fetchImages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery image",
        variant: "destructive",
      });
    }
  };

  const handleReorderImage = async (image: GalleryImage, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === image.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const targetImage = images[targetIndex];
    
    try {
      // Swap display orders
      await supabase
        .from('gallery_images')
        .update({ display_order: targetImage.display_order })
        .eq('id', image.id);

      await supabase
        .from('gallery_images')
        .update({ display_order: image.display_order })
        .eq('id', targetImage.id);

      fetchImages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reorder gallery image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage Gallery</h2>
          <p className="text-slate-400">Add, edit, or delete gallery images</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Image</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add a new image to the gallery showcase.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload Image</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="bg-slate-700 border-slate-600"
                  />
                  <Upload className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="src">Or Image URL</Label>
                <Input
                  id="src"
                  value={newImage.src}
                  onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              {newImage.src && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <img
                    src={newImage.src}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md border border-slate-600"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input
                  id="alt"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Description of the image"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newImage.title}
                  onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Image title"
                />
              </div>
              <Button onClick={handleAddImage} className="w-full" disabled={!newImage.src}>
                Add Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {images.map((image, index) => (
          <Card key={image.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-20 h-20 object-cover rounded-md border border-slate-600"
                  />
                  <div>
                    <CardTitle className="text-white text-lg">{image.title}</CardTitle>
                    <CardDescription className="text-slate-400">{image.alt}</CardDescription>
                    <p className="text-sm text-slate-500 mt-1">Order: {image.display_order}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderImage(image, 'up')}
                      disabled={index === 0}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 p-1 h-auto"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderImage(image, 'down')}
                      disabled={index === images.length - 1}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 p-1 h-auto"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingImage(image)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Image</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          Update the gallery image details.
                        </DialogDescription>
                      </DialogHeader>
                      {editingImage && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-src">Image URL</Label>
                            <Input
                              id="edit-src"
                              value={editingImage.src}
                              onChange={(e) => setEditingImage({ ...editingImage, src: e.target.value })}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          {editingImage.src && (
                            <div className="space-y-2">
                              <Label>Preview</Label>
                              <img
                                src={editingImage.src}
                                alt="Preview"
                                className="w-full h-32 object-cover rounded-md border border-slate-600"
                              />
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="edit-alt">Alt Text</Label>
                            <Input
                              id="edit-alt"
                              value={editingImage.alt}
                              onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={editingImage.title}
                              onChange={(e) => setEditingImage({ ...editingImage, title: e.target.value })}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <Button onClick={handleUpdateImage} className="w-full">
                            Update Image
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteImage(image.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;