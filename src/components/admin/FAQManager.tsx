import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, ArrowUp, ArrowDown } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: string;
}

const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    display_order: 0
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load FAQs",
        variant: "destructive",
      });
    }
  };

  const handleAddFaq = async () => {
    try {
      const { error } = await supabase
        .from('faqs')
        .insert([{ ...newFaq, display_order: faqs.length + 1 }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "FAQ added successfully",
      });

      setNewFaq({ question: "", answer: "", display_order: 0 });
      setIsAddDialogOpen(false);
      fetchFaqs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add FAQ",
        variant: "destructive",
      });
    }
  };

  const handleUpdateFaq = async () => {
    if (!editingFaq) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .update({
          question: editingFaq.question,
          answer: editingFaq.answer,
          display_order: editingFaq.display_order
        })
        .eq('id', editingFaq.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "FAQ updated successfully",
      });

      setEditingFaq(null);
      setIsEditDialogOpen(false);
      fetchFaqs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update FAQ",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFaq = async (id: string) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "FAQ deleted successfully",
      });

      fetchFaqs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete FAQ",
        variant: "destructive",
      });
    }
  };

  const handleReorderFaq = async (faq: FAQ, direction: 'up' | 'down') => {
    const currentIndex = faqs.findIndex(f => f.id === faq.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const targetFaq = faqs[targetIndex];
    
    try {
      // Swap display orders
      await supabase
        .from('faqs')
        .update({ display_order: targetFaq.display_order })
        .eq('id', faq.id);

      await supabase
        .from('faqs')
        .update({ display_order: faq.display_order })
        .eq('id', targetFaq.id);

      fetchFaqs();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reorder FAQ",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Manage FAQs</h2>
          <p className="text-slate-400">Add, edit, or delete frequently asked questions</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add a new frequently asked question to help your customers.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="bg-slate-700 border-slate-600"
                  rows={4}
                />
              </div>
              <Button onClick={handleAddFaq} className="w-full">
                Add FAQ
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <Card key={faq.id} className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
                  <CardDescription className="text-slate-400 mt-2">{faq.answer}</CardDescription>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderFaq(faq, 'up')}
                      disabled={index === 0}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 p-1 h-auto"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReorderFaq(faq, 'down')}
                      disabled={index === faqs.length - 1}
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
                        onClick={() => setEditingFaq(faq)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700 text-white">
                      <DialogHeader>
                        <DialogTitle>Edit FAQ</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          Update the frequently asked question details.
                        </DialogDescription>
                      </DialogHeader>
                      {editingFaq && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-question">Question</Label>
                            <Input
                              id="edit-question"
                              value={editingFaq.question}
                              onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-answer">Answer</Label>
                            <Textarea
                              id="edit-answer"
                              value={editingFaq.answer}
                              onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                              className="bg-slate-700 border-slate-600"
                              rows={4}
                            />
                          </div>
                          <Button onClick={handleUpdateFaq} className="w-full">
                            Update FAQ
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteFaq(faq.id)}
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

export default FAQManager;