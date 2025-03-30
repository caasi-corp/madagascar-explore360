
import React from 'react';
import Hero from '@/components/Hero';
import { Shield, Award, Heart, UserCheck, Globe, Leaf } from 'lucide-react';

const About = () => {
  return (
    <>
      <Hero 
        title="À Propos de North Gascar Tours"
        subtitle="Découvrez notre histoire et notre engagement envers un tourisme durable et responsable à Madagascar"
        showSearch={false}
        height="h-[60vh]"
        backgroundImage="https://images.unsplash.com/photo-1494548162494-384bba4ab999"
      />
      
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <p className="text-lg text-muted-foreground mb-4">
              North Gascar Tours a été fondée en 2018 par une équipe passionnée de guides locaux et d'experts du tourisme. 
              Notre objectif était simple : faire découvrir les merveilles du nord de Madagascar aux voyageurs du monde entier, 
              tout en préservant les écosystèmes naturels et en soutenant les communautés locales.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Au fil des années, nous avons développé une expertise unique dans l'organisation de circuits sur mesure 
              qui combinent aventure, découverte culturelle et observation de la faune et de la flore uniques de Madagascar.
            </p>
            <p className="text-lg text-muted-foreground">
              Aujourd'hui, North Gascar Tours est fière d'être reconnue comme l'une des agences de voyage les plus 
              fiables et écoresponsables de Madagascar, avec une équipe de guides experts et passionnés prêts à vous 
              faire vivre une expérience inoubliable.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">Nos Valeurs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Shield className="text-northgascar-teal mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-2">Sécurité</h3>
                  <p className="text-muted-foreground">La sécurité de nos clients est notre priorité absolue</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Award className="text-northgascar-orange mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">Nous visons l'excellence dans chaque aspect de nos services</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="text-northgascar-pink mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-2">Passion</h3>
                  <p className="text-muted-foreground">Nous partageons notre passion pour Madagascar avec enthousiasme</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <UserCheck className="text-northgascar-yellow mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-2">Authenticité</h3>
                  <p className="text-muted-foreground">Nous offrons des expériences authentiques et immersives</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Leaf className="text-northgascar-green mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-2">Durabilité</h3>
                  <p className="text-muted-foreground">Nous respectons l'environnement et les écosystèmes fragiles</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Globe className="text-northgascar-navy mt-1" size={24} />
                <div>
                  <h3 className="font-bold mb-2">Communauté</h3>
                  <p className="text-muted-foreground">Nous soutenons les communautés locales et l'économie malgache</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
