import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type MenuItem, type InsertMenuItem, insertMenuItemSchema } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPanel() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  const form = useForm<InsertMenuItem>({
    resolver: zodResolver(insertMenuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "Açaí",
      popular: false,
      available: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertMenuItem) => apiRequest("/api/menu", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu"] });
      form.reset();
      toast({ title: "Item adicionado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao adicionar item", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<MenuItem> }) => 
      apiRequest(`/api/menu/${id}`, "PATCH", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu"] });
      setIsEditing(null);
      toast({ title: "Item atualizado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao atualizar item", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/menu/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu"] });
      toast({ title: "Item removido com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao remover item", variant: "destructive" });
    },
  });

  const onSubmit = (data: InsertMenuItem) => {
    createMutation.mutate(data);
  };

  const handleToggleAvailable = (id: string, available: boolean) => {
    updateMutation.mutate({ id, data: { available } });
  };

  const handleTogglePopular = (id: string, popular: boolean) => {
    updateMutation.mutate({ id, data: { popular } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Carregando painel administrativo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie o menu da Lanchonete & Cia</p>
        </div>

        {/* Add New Item Form */}
        <Card className="mb-8" data-testid="card-add-item">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Adicionar Novo Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Item</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Açaí com Morango" 
                            {...field} 
                            data-testid="input-item-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: 6.50" 
                            {...field} 
                            data-testid="input-item-price"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva o item do menu..." 
                          {...field} 
                          data-testid="input-item-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-item-category">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Açaí">Açaí</SelectItem>
                          <SelectItem value="Hambúrgueres">Hambúrgueres</SelectItem>
                          <SelectItem value="Salgados">Salgados</SelectItem>
                          <SelectItem value="Porções">Porções</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="popular"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-y-0 gap-2">
                        <FormControl>
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            data-testid="switch-item-popular"
                          />
                        </FormControl>
                        <FormLabel>Item Popular</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-y-0 gap-2">
                        <FormControl>
                          <Switch
                            checked={field.value || false}
                            onCheckedChange={field.onChange}
                            data-testid="switch-item-available"
                          />
                        </FormControl>
                        <FormLabel>Disponível</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={createMutation.isPending}
                  data-testid="button-add-item"
                >
                  {createMutation.isPending ? "Adicionando..." : "Adicionar Item"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Menu Items List */}
        <div className="grid gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Itens do Menu</h2>
          
          {menuItems?.map((item) => (
            <Card key={item.id} className="hover-elevate" data-testid={`card-menu-item-${item.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold" data-testid={`text-item-name-${item.id}`}>
                        {item.name}
                      </h3>
                      <Badge variant="secondary" data-testid={`badge-category-${item.id}`}>
                        {item.category}
                      </Badge>
                      {item.popular && (
                        <Badge variant="default" data-testid={`badge-popular-${item.id}`}>
                          Popular
                        </Badge>
                      )}
                      {!item.available && (
                        <Badge variant="destructive" data-testid={`badge-unavailable-${item.id}`}>
                          Indisponível
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2" data-testid={`text-item-description-${item.id}`}>
                      {item.description}
                    </p>
                    <p className="text-xl font-bold text-primary" data-testid={`text-item-price-${item.id}`}>
                      R$ {item.price}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.available || false}
                          onCheckedChange={(checked) => handleToggleAvailable(item.id, checked)}
                          disabled={updateMutation.isPending}
                          data-testid={`switch-available-${item.id}`}
                        />
                        <Label className="text-sm">Disponível</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={item.popular || false}
                          onCheckedChange={(checked) => handleTogglePopular(item.id, checked)}
                          disabled={updateMutation.isPending}
                          data-testid={`switch-popular-${item.id}`}
                        />
                        <Label className="text-sm">Popular</Label>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(item.id)}
                        data-testid={`button-edit-${item.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}