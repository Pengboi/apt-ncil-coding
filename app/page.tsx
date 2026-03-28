"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Scissors, Sparkles, Heart, Check, CheckCircle2, Clock, CalendarDays, Dog, MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { staggerContainer, fadeInUp } from "@/lib/motion";

// Services Data
const services = [
  {
    icon: Scissors,
    title: "Full Grooming",
    description: "Complete grooming package including bath, haircut, nail trim, and ear cleaning.",
    price: "From £45",
  },
  {
    icon: Sparkles,
    title: "Bath & Brush",
    description: "Relaxing bath with premium shampoos followed by thorough brushing.",
    price: "From £25",
  },
  {
    icon: Heart,
    title: "Puppy Package",
    description: "Gentle introduction to grooming for puppies under 6 months.",
    price: "From £30",
  },
];


const addOnServices = [
  { name: "Nail Trimming Only", price: "£12" },
  { name: "Teeth Brushing", price: "£8" },
  { name: "De-matting Treatment", price: "£15+" },
  { name: "Flea Treatment", price: "£20" },
  { name: "Blueberry Facial", price: "£10" },
  { name: "Paw Balm Treatment", price: "£8" },
  { name: "De-shedding Treatment", price: "£25" },
];

// Testimonials Data
const testimonials = [
  {
    name: "Sarah M.",
    text: "The team at Dazziling Dog Groomers are amazing! My golden retriever always comes back looking beautiful and happy.",
    rating: 5,
  },
  {
    name: "James L.",
    text: "Professional, caring, and thorough. They really understand how to handle nervous dogs. Highly recommend!",
    rating: 5,
  },
  {
    name: "Emma R.",
    text: "Best groomers in Finsbury Park! Fair prices and excellent service. My poodle has never looked better.",
    rating: 5,
  },
];

// Gallery Data
const galleryImages = [
  { type: "before", description: "Golden Retriever - Before", breed: "Golden Retriever" },
  { type: "after", description: "Golden Retriever - After", breed: "Golden Retriever" },
  { type: "before", description: "Poodle - Before", breed: "Poodle" },
  { type: "after", description: "Poodle - After", breed: "Poodle" },
  { type: "before", description: "Cocker Spaniel - Before", breed: "Cocker Spaniel" },
  { type: "after", description: "Cocker Spaniel - After", breed: "Cocker Spaniel" },
];

// Team Data
const team = [
  {
    name: "Emma Thompson",
    role: "Lead Groomer & Founder",
    bio: "With over 10 years of experience, Emma founded Dazziling Dog Groomers to provide premium care for London's dogs.",
    initials: "ET",
  },
  {
    name: "James Wilson",
    role: "Senior Groomer",
    bio: "James specializes in breed-specific cuts and has a gentle approach with nervous dogs.",
    initials: "JW",
  },
  {
    name: "Sarah Chen",
    role: "Groomer",
    bio: "Sarah is passionate about creative styling and loves working with puppies.",
    initials: "SC",
  },
];

// Values Data
const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every dog with love and patience, ensuring they feel safe and comfortable.",
  },
  {
    icon: Scissors,
    title: "Expert Grooming",
    description: "Our certified groomers are trained in the latest techniques for all breeds.",
  },
  {
    icon: Sparkles,
    title: "Premium Products",
    description: "We use only high-quality, dog-safe shampoos and conditioners.",
  },
  {
    icon: CheckCircle2,
    title: "Attention to Detail",
    description: "From nose to tail, we ensure every aspect of your dog's grooming is perfect.",
  },
];

// FAQ Data

// Blog Preview Data
const blogPosts = [
  {
    title: "How Often Should You Groom Your Dog?",
    excerpt: "Understanding the right grooming frequency for your dog based on breed and coat type.",
    category: "Grooming Tips",
    date: "March 15, 2024",
    slug: "how-often-groom-dog",
  },
  {
    title: "5 Signs Your Dog Needs Professional Grooming",
    excerpt: "Learn to recognize when it's time to bring your furry friend to the groomer.",
    category: "Pet Care",
    date: "March 10, 2024",
    slug: "signs-dog-needs-grooming",
  },
  {
    title: "The Benefits of Regular Nail Trimming",
    excerpt: "Why keeping your dog's nails short is essential for their health and comfort.",
    category: "Health",
    date: "March 5, 2024",
    slug: "benefits-nail-trimming",
  },
];

// Booking Data
const bookingServices = [
  { id: "full-grooming", name: "Full Grooming Package", price: "£45 - £75", duration: "1.5 - 2 hours" },
  { id: "bath-brush", name: "Bath & Brush", price: "£25 - £40", duration: "45 - 60 mins" },
  { id: "puppy", name: "Puppy Package", price: "£30 - £45", duration: "1 - 1.5 hours" },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
];

const dogSizes = [
  { value: "small", label: "Small (under 10kg)" },
  { value: "medium", label: "Medium (10-20kg)" },
  { value: "large", label: "Large (20-40kg)" },
  { value: "xlarge", label: "Extra Large (40kg+)" },
];

export default function HomePage() {
  // Booking form state
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    dogName: "",
    dogBreed: "",
    dogSize: "" as string | null,
    specialNotes: "",
  });
  const [bookingStep, setBookingStep] = useState(1);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking request submitted! We'll confirm your appointment within 24 hours.");
    setBookingStep(1);
    setDate(undefined);
    setSelectedTime("");
    setSelectedService("");
    setFormData({
      ownerName: "",
      email: "",
      phone: "",
      dogName: "",
      dogBreed: "",
      dogSize: "",
      specialNotes: "",
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setContactFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle date selection safely
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="home" className="relative py-20 lg:py-32 bg-secondary overflow-hidden">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp} className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground">
                Premium Dog Grooming in{" "}
                <span className="text-primary">Finsbury Park</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Treat your furry friend to a luxurious grooming experience. Our expert groomers provide top-quality care for dogs of all breeds and sizes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => scrollToSection('booking')}>
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('services')}>
                  View Services
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span>50+ 5-star reviews</span>
              </div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
            >
              <Image
                src="https://images.unsplash.com/photo-1719464454959-9cf304ef4774?q=80&w=2070&auto=format&fit=crop"
                alt="Happy dog at grooming salon"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">Our Services</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
              From basic baths to full grooming packages, we offer everything your dog needs to look and feel their best.
            </motion.p>
          </motion.div>

          {/* Service Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group h-full hover:shadow-lg transition-shadow flex flex-col">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold leading-tight">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm flex-grow mb-4 leading-relaxed">{service.description}</p>
                    <div className="pt-4 border-t border-border mt-auto">
                      <p className="text-primary font-bold text-lg">{service.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>


          {/* Add-ons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Add-On Services</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {addOnServices.map((service, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-primary font-semibold">{service.price}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">Our Work</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See the amazing transformations we create. From shaggy to chic, we bring out the best in every dog.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryImages.map((image, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                        <div className="text-center p-4">
                          <p className="text-muted-foreground mb-2">Photo placeholder</p>
                          <p className="text-sm font-medium">{image.description}</p>
                        </div>
                      </div>
                      <Badge 
                        className={`absolute top-4 right-4 ${
                          image.type === 'before' ? 'bg-muted-foreground' : 'bg-primary'
                        }`}
                      >
                        {image.type === 'before' ? 'Before' : 'After'}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <p className="font-medium">{image.breed}</p>
                      <p className="text-sm text-muted-foreground capitalize">{image.type} grooming</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold">About Dazziling Dog Groomers</h2>
              <p className="text-lg text-muted-foreground">
                Founded in 2019, Dazziling Dog Groomers has become Finsbury Park&apos;s trusted destination for premium dog grooming. 
                Our mission is simple: to provide exceptional care that leaves every dog looking and feeling their best.
              </p>
              <p className="text-muted-foreground">
                We believe that grooming is more than just aesthetics - it&apos;s about your dog&apos;s health, comfort, and happiness. 
                That&apos;s why we take the time to understand each dog&apos;s unique needs and provide personalized care.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-muted"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary">
                <div className="text-center">
                  <Scissors className="h-20 w-20 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Shop interior photo</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Values */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h3 variants={fadeInUp} className="text-3xl font-bold mb-4">Our Values</motion.h3>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>


          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mt-16 pt-16 border-t"
          >
            <div>
              <p className="text-4xl font-bold text-primary mb-2">5+</p>
              <p className="text-muted-foreground">Years in Business</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">1000+</p>
              <p className="text-muted-foreground">Happy Dogs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">3</p>
              <p className="text-muted-foreground">Expert Groomers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted-foreground">5-Star Reviews</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-4">What Our Customers Say</motion.h2>
            <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from our happy customers and their well-groomed pups.
            </motion.p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">&quot;{testimonial.text}&quot;</p>
                    <p className="font-semibold">- {testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Section - Simplified without Calendar */}
      <section id="booking" className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">Book Your Appointment</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a grooming session for your furry friend. We&apos;ll confirm your booking within 24 hours.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-6">
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Step 1: Service Selection */}
                  {bookingStep === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold">Select a Service</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {bookingServices.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedService === service.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <h4 className="font-semibold">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">{service.price}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <Clock className="inline h-3 w-3 mr-1" />
                              {service.duration}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Button
                        type="button"
                        onClick={() => setBookingStep(2)}
                        disabled={!selectedService}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Continue
                      </Button>
                    </div>
                  )}

                  {/* Step 2: Date Selection */}
                  {bookingStep === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold">Select Date & Time</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Preferred Date *</Label>
                          <Input
                            type="date"
                            value={date ? date.toISOString().split('T')[0] : ''}
                            onChange={(e) => handleDateSelect(e.target.value ? new Date(e.target.value) : undefined)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Preferred Time *</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant={selectedTime === time ? "default" : "outline"}
                                onClick={() => setSelectedTime(time)}
                                className={selectedTime === time ? "bg-primary" : ""}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setBookingStep(1)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setBookingStep(3)}
                          disabled={!date || !selectedTime}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Details */}
                  {bookingStep === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold">Your Details</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ownerName">Your Name *</Label>
                          <Input
                            id="ownerName"
                            value={formData.ownerName}
                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                            placeholder="John Smith"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@email.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="020 1234 5678"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dogName">Dog&apos;s Name *</Label>
                          <Input
                            id="dogName"
                            value={formData.dogName}
                            onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                            placeholder="Buddy"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dogBreed">Breed *</Label>
                          <Input
                            id="dogBreed"
                            value={formData.dogBreed}
                            onChange={(e) => setFormData({ ...formData, dogBreed: e.target.value })}
                            placeholder="Golden Retriever"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dogSize">Size *</Label>
                          <Select
                            value={formData.dogSize || undefined}
                            onValueChange={(value) =>
                              setFormData({ ...formData, dogSize: value || "" })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              {dogSizes.map((size) => (
                                <SelectItem key={size.value} value={size.value}>
                                  {size.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialNotes">Special Notes</Label>
                        <Textarea
                          id="specialNotes"
                          value={formData.specialNotes}
                          onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                          placeholder="Any allergies, behavioral notes, or special requests..."
                          rows={3}
                        />
                      </div>

                      {/* Summary */}
                      <Card className="bg-muted">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Booking Summary</h4>
                          <p className="text-sm text-muted-foreground">
                            <CalendarDays className="inline h-4 w-4 mr-1" />
                            {date ? date.toLocaleDateString() : "No date selected"} at {selectedTime}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            <Dog className="inline h-4 w-4 mr-1" />
                            {bookingServices.find((s) => s.id === selectedService)?.name}
                          </p>
                        </CardContent>
                      </Card>

                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setBookingStep(2)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Confirm Booking
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
