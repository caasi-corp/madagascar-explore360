
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <>
      <section className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une question, une demande spécifique ou besoin d'informations supplémentaires ? 
              N'hésitez pas à nous contacter, nous sommes là pour vous aider.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <ContactForm />
            
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-xl mb-8">
                <h2 className="text-2xl font-bold mb-6">Coordonnées</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-northgascar-teal mt-1" />
                    <div>
                      <h3 className="font-bold">Adresse</h3>
                      <p className="text-muted-foreground">
                        Bureau North Gascar Tours<br />
                        Antananarivo, Madagascar
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="text-northgascar-teal mt-1" />
                    <div>
                      <h3 className="font-bold">Téléphone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+261320500999">+261 32 050 09 99</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="text-northgascar-teal mt-1" />
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@northgascartours.com">info@northgascartours.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="text-northgascar-teal mt-1" />
                    <div>
                      <h3 className="font-bold">Heures d'Ouverture</h3>
                      <p className="text-muted-foreground">
                        Lundi - Vendredi: 8h30 - 17h00<br />
                        Samedi: 9h00 - 12h00<br />
                        Dimanche: Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl overflow-hidden">
                <h3 className="text-xl font-bold mb-4">Nous Trouver</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60436.91939530432!2d47.5033698!3d-18.9097208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f07de34f1f4eb3%3A0xdf110608bcc082f9!2sAntananarivo%2C%20Madagascar!5e0!3m2!1sen!2sus!4v1667384245232!5m2!1sen!2sus"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Carte Google Maps"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
