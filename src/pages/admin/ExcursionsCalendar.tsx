import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon, Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { bookingAPI } from '@/lib/api/bookingAPI';
import { tourAPI } from '@/lib/api/tourAPI';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface Excursion {
  id: string;
  customer: string;
  tour: string;
  date: string;
  endDate: string;
  amount: number;
  participants: number;
  status: 'Confirmé' | 'En attente' | 'Annulé';
}

type CalendarViewMode = 'month' | 'week' | 'day' | 'list';

const ExcursionsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  const [excursions, setExcursions] = useState<Excursion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedExcursion, setSelectedExcursion] = useState<Excursion | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const { toast } = useToast();
  const [availableTours, setAvailableTours] = useState<{id: string, title: string}[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const mockExcursions: Excursion[] = [
        {
          id: 'EX001',
          customer: 'Jean Dupont',
          tour: 'Avenue des Baobabs',
          date: '2025-04-10',
          endDate: '2025-04-12',
          amount: 599,
          participants: 2,
          status: 'Confirmé',
        },
        {
          id: 'EX002',
          customer: 'Marie Laurent',
          tour: 'Trekking aux Lémuriens',
          date: '2025-04-15',
          endDate: '2025-04-17',
          amount: 349,
          participants: 3,
          status: 'En attente',
        },
        {
          id: 'EX003',
          customer: 'Pierre Martin',
          tour: 'Parc National d\'Isalo',
          date: '2025-04-18',
          endDate: '2025-04-22',
          amount: 499,
          participants: 4,
          status: 'Confirmé',
        },
        {
          id: 'EX004',
          customer: 'Sophie Garcia',
          tour: 'Île de Nosy Be',
          date: '2025-04-22',
          endDate: '2025-04-27',
          amount: 699,
          participants: 2,
          status: 'Annulé',
        },
        {
          id: 'EX005',
          customer: 'Thomas Dubois',
          tour: 'Tsingy de Bemaraha',
          date: '2025-04-25',
          endDate: '2025-04-29',
          amount: 549,
          participants: 5,
          status: 'Confirmé',
        },
      ];
      
      setExcursions(mockExcursions);
      
      setAvailableTours([
        { id: 'T001', title: 'Avenue des Baobabs' },
        { id: 'T002', title: 'Trekking aux Lémuriens' },
        { id: 'T003', title: 'Parc National d\'Isalo' },
        { id: 'T004', title: 'Île de Nosy Be' },
        { id: 'T005', title: 'Tsingy de Bemaraha' },
      ]);
    };
    
    fetchData();
  }, []);
  
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });
  
  const filteredExcursions = excursions.filter(excursion => {
    const matchesSearch = 
      excursion.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excursion.tour.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excursion.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filterStatus || excursion.status === filterStatus;
    
    const matchesSelectedDate = !selectedDate || 
      (new Date(excursion.date) <= selectedDate && new Date(excursion.endDate) >= selectedDate);
    
    return matchesSearch && matchesStatus && matchesSelectedDate;
  });
  
  const navigatePrevious = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (viewMode === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    } else if (viewMode === 'day') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 1);
      setCurrentDate(newDate);
    }
  };
  
  const navigateNext = () => {
    if (viewMode === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (viewMode === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    } else if (viewMode === 'day') {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 1);
      setCurrentDate(newDate);
    }
  };
  
  const navigateToday = () => {
    setCurrentDate(new Date());
  };
  
  const getExcursionsForDate = (date: Date) => {
    return excursions.filter(excursion => {
      const startDate = new Date(excursion.date);
      const endDate = new Date(excursion.endDate);
      return startDate <= date && endDate >= date;
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmé':
        return <Badge className="bg-green-500">Confirmé</Badge>;
      case 'En attente':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">En attente</Badge>;
      case 'Annulé':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const renderDay = (day: Date) => {
    const dayExcursions = getExcursionsForDate(day);
    const isToday = isSameDay(day, new Date());
    
    return (
      <div 
        className={cn(
          "min-h-[120px] p-1 border border-border hover:bg-accent/10 cursor-pointer transition-colors",
          isToday ? "bg-accent/20" : ""
        )}
        onClick={() => {
          setSelectedDate(day);
          setViewMode('day');
        }}
      >
        <div className="font-medium text-sm mb-1">{format(day, 'd')}</div>
        {dayExcursions.length > 0 ? (
          <div className="space-y-1">
            {dayExcursions.slice(0, 3).map((excursion) => (
              <div 
                key={excursion.id}
                className={cn(
                  "text-xs p-1 rounded truncate",
                  excursion.status === 'Confirmé' ? "bg-green-100 text-green-800" :
                  excursion.status === 'En attente' ? "bg-amber-100 text-amber-800" :
                  "bg-red-100 text-red-800"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedExcursion(excursion);
                  setIsDetailsDialogOpen(true);
                }}
              >
                {excursion.tour} ({excursion.participants}p)
              </div>
            ))}
            {dayExcursions.length > 3 && (
              <div className="text-xs text-muted-foreground text-center">
                +{dayExcursions.length - 3} plus
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  };
  
  const renderViewContent = () => {
    switch (viewMode) {
      case 'month':
        return (
          <div className="grid grid-cols-7 gap-0">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-sm border-b">
                {day}
              </div>
            ))}
            {Array(startOfMonth(currentDate).getDay() === 0 ? 6 : startOfMonth(currentDate).getDay() - 1)
              .fill(null)
              .map((_, i) => (
                <div key={`empty-start-${i}`} className="min-h-[120px] bg-muted/20 border border-border"></div>
              ))}
            {daysInMonth.map((day) => (
              <div key={day.toISOString()}>
                {renderDay(day)}
              </div>
            ))}
          </div>
        );
        
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
        const daysInWeek = Array.from({ length: 7 }, (_, i) => {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          return day;
        });
        
        return (
          <div>
            <div className="grid grid-cols-7 gap-0">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
                <div key={day} className="p-2 text-center font-medium border-b">
                  <div>{day}</div>
                  <div>{format(daysInWeek[index], 'd MMM', { locale: fr })}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0">
              {daysInWeek.map((day) => (
                <div key={day.toISOString()} className="min-h-[500px] border-r border-b p-2">
                  {getExcursionsForDate(day).map(excursion => (
                    <div 
                      key={excursion.id} 
                      className={cn(
                        "mb-2 p-2 rounded text-sm cursor-pointer",
                        excursion.status === 'Confirmé' ? "bg-green-100 text-green-800" :
                        excursion.status === 'En attente' ? "bg-amber-100 text-amber-800" :
                        "bg-red-100 text-red-800"
                      )}
                      onClick={() => {
                        setSelectedExcursion(excursion);
                        setIsDetailsDialogOpen(true);
                      }}
                    >
                      <div className="font-medium">{excursion.tour}</div>
                      <div className="text-xs">
                        {excursion.customer} ({excursion.participants} pers.)
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'day':
        const dayToShow = selectedDate || currentDate;
        const dayExcursions = getExcursionsForDate(dayToShow);
        
        return (
          <div>
            <div className="text-xl font-semibold mb-4">
              {format(dayToShow, 'EEEE d MMMM yyyy', { locale: fr })}
            </div>
            
            {dayExcursions.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Aucune excursion prévue pour cette date
              </div>
            ) : (
              <div className="space-y-4">
                {dayExcursions.map(excursion => (
                  <Card key={excursion.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedExcursion(excursion);
                      setIsDetailsDialogOpen(true);
                    }}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-lg">{excursion.tour}</div>
                          <div className="text-sm text-muted-foreground">Client: {excursion.customer}</div>
                          <div className="text-sm">
                            Du {format(new Date(excursion.date), 'd MMM', { locale: fr })} au {format(new Date(excursion.endDate), 'd MMM yyyy', { locale: fr })}
                          </div>
                          <div className="text-sm">{excursion.participants} participants</div>
                        </div>
                        <div className="flex flex-col items-end">
                          {getStatusBadge(excursion.status)}
                          <div className="text-lg font-medium mt-2">{excursion.amount} €</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'list':
        return (
          <div className="space-y-4">
            {filteredExcursions.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Aucune excursion trouvée
              </div>
            ) : (
              filteredExcursions.map(excursion => (
                <Card key={excursion.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedExcursion(excursion);
                    setIsDetailsDialogOpen(true);
                  }}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg">{excursion.tour}</div>
                        <div className="text-sm text-muted-foreground">Réf: {excursion.id} | Client: {excursion.customer}</div>
                        <div className="text-sm">
                          Du {format(new Date(excursion.date), 'd MMM', { locale: fr })} au {format(new Date(excursion.endDate), 'd MMM yyyy', { locale: fr })}
                        </div>
                        <div className="text-sm">{excursion.participants} participants</div>
                      </div>
                      <div className="flex flex-col items-end">
                        {getStatusBadge(excursion.status)}
                        <div className="text-lg font-medium mt-2">{excursion.amount} €</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );
    }
  };
  
  const handleUpdateStatus = (id: string, status: 'Confirmé' | 'En attente' | 'Annulé') => {
    setExcursions(excursions.map(excursion => 
      excursion.id === id ? { ...excursion, status } : excursion
    ));
    
    setSelectedExcursion(prev => 
      prev && prev.id === id ? { ...prev, status } : prev
    );
    
    toast({
      title: "Statut mis à jour",
      description: `L'excursion #${id} est maintenant ${status.toLowerCase()}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendrier des Excursions</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={navigateToday}>
            Aujourd'hui
          </Button>
          <Button variant="outline" size="icon" onClick={navigatePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={navigateNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="text-lg font-medium pl-2 pr-4">
            {viewMode === 'month' && format(currentDate, 'MMMM yyyy', { locale: fr })}
            {viewMode === 'week' && (
              <>
                Semaine du {format(
                  (() => {
                    const d = new Date(currentDate);
                    d.setDate(d.getDate() - d.getDay() + (d.getDay() === 0 ? -6 : 1));
                    return d;
                  })(), 
                  'd MMM', 
                  { locale: fr }
                )}
              </>
            )}
            {viewMode === 'day' && format(selectedDate || currentDate, 'd MMMM yyyy', { locale: fr })}
          </div>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === 'month' ? 'default' : 'outline'} 
                onClick={() => setViewMode('month')}
              >
                Mois
              </Button>
              <Button 
                variant={viewMode === 'week' ? 'default' : 'outline'} 
                onClick={() => setViewMode('week')}
              >
                Semaine
              </Button>
              <Button 
                variant={viewMode === 'day' ? 'default' : 'outline'} 
                onClick={() => setViewMode('day')}
              >
                Jour
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'} 
                onClick={() => setViewMode('list')}
              >
                Liste
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  placeholder="Rechercher..." 
                  className="pl-9 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterStatus || ''} onValueChange={(value) => setFilterStatus(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="Confirmé">Confirmé</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Annulé">Annulé</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate || undefined}
                    onSelect={(date) => setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              {selectedDate && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedDate(null)}
                >
                  Effacer la date
                </Button>
              )}
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          {renderViewContent()}
        </CardContent>
      </Card>
      
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedExcursion && (
            <>
              <DialogHeader>
                <DialogTitle>Détails de l'Excursion #{selectedExcursion.id}</DialogTitle>
                <DialogDescription>
                  {getStatusBadge(selectedExcursion.status)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Circuit</h4>
                  <p className="text-base font-medium">{selectedExcursion.tour}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Client</h4>
                  <p className="text-base">{selectedExcursion.customer}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Date de début</h4>
                    <p className="text-base">{format(new Date(selectedExcursion.date), 'dd MMMM yyyy', { locale: fr })}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Date de fin</h4>
                    <p className="text-base">{format(new Date(selectedExcursion.endDate), 'dd MMMM yyyy', { locale: fr })}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Participants</h4>
                    <p className="text-base">{selectedExcursion.participants} {selectedExcursion.participants > 1 ? 'personnes' : 'personne'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Montant</h4>
                    <p className="text-base font-medium">{selectedExcursion.amount} €</p>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  {selectedExcursion.status !== 'Confirmé' && (
                    <Button onClick={() => handleUpdateStatus(selectedExcursion.id, 'Confirmé')} size="sm">
                      Confirmer
                    </Button>
                  )}
                  {selectedExcursion.status !== 'En attente' && (
                    <Button variant="outline" onClick={() => handleUpdateStatus(selectedExcursion.id, 'En attente')} size="sm">
                      Mettre en attente
                    </Button>
                  )}
                  {selectedExcursion.status !== 'Annulé' && (
                    <Button variant="destructive" onClick={() => handleUpdateStatus(selectedExcursion.id, 'Annulé')} size="sm">
                      Annuler
                    </Button>
                  )}
                </div>
                <DialogClose asChild>
                  <Button variant="outline" size="sm">Fermer</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExcursionsCalendar;
