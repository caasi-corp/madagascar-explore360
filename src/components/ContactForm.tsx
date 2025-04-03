
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Define the schema for form validation
const formSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  subject: z.string().min(3, { message: "Le sujet doit contenir au moins 3 caractères." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate form submission with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', data);
      
      // Show success toast notification
      toast({
        title: "Message envoyé!",
        description: "Nous vous contacterons dès que possible.",
      });

      // Reset the form
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel variant="glass">Prénom</FormLabel>
                  <FormControl>
                    <Input 
                      variant="glass" 
                      placeholder="Votre prénom" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel variant="glass">Nom</FormLabel>
                  <FormControl>
                    <Input 
                      variant="glass" 
                      placeholder="Votre nom" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel variant="glass">Email</FormLabel>
                <FormControl>
                  <Input 
                    variant="glass" 
                    type="email" 
                    placeholder="votre@email.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel variant="glass">Sujet</FormLabel>
                <FormControl>
                  <Input 
                    variant="glass" 
                    placeholder="Objet de votre message" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel variant="glass">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    variant="glass" 
                    placeholder="Comment pouvons-nous vous aider ?" 
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            variant="glass" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              "Envoyer le message"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
