import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Star, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  created_at: string;
}

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    location: "",
    rating: 5,
    review: ""
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    }
  };

  const handleAddTestimonial = async () => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([newTestimonial]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial added successfully",
      });

      setNewTestimonial({ name: "", location: "", rating: 5, review: "" });
      setIsAddDialogOpen(false);
      fetchTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add testimonial",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTestimonial = async () => {
    if (!editingTestimonial) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          name: editingTestimonial.name,
          location: editingTestimonial.location,
          rating: editingTestimonial.rating,
          review: editingTestimonial.review
        })
        .eq('id', editingTestimonial.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial updated successfully",
      });

      setEditingTestimonial(null);
      setIsEditDialogOpen(false);
      fetchTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });

      fetchTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-400"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage Reviews</h2>
          <p className="text-slate-400">Add, edit, or delete customer testimonials</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Add New Review</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add a new customer testimonial to showcase your service quality.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newTestimonial.location}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={newTestimonial.rating}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  value={newTestimonial.review}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, review: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                  rows={4}
                />
              </div>
              <Button onClick={handleAddTestimonial} className="w-full">
                Add Review
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">{testimonial.name}</CardTitle>
                  <CardDescription className="text-slate-400">{testimonial.location}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingTestimonial(testimonial)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700 text-white">
                      <DialogHeader>
                        <DialogTitle>Edit Review</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          Update the customer testimonial details.
                        </DialogDescription>
                      </DialogHeader>
                      {editingTestimonial && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">Customer Name</Label>
                            <Input
                              id="edit-name"
                              value={editingTestimonial.name}
                              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-location">Location</Label>
                            <Input
                              id="edit-location"
                              value={editingTestimonial.location}
                              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-rating">Rating (1-5)</Label>
                            <Input
                              id="edit-rating"
                              type="number"
                              min="1"
                              max="5"
                              value={editingTestimonial.rating}
                              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-review">Review</Label>
                            <Textarea
                              id="edit-review"
                              value={editingTestimonial.review}
                              onChange={(e) => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                              className="bg-slate-700 border-slate-600"
                              rows={4}
                            />
                          </div>
                          <Button onClick={handleUpdateTestimonial} className="w-full">
                            Update Review
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">{testimonial.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager;