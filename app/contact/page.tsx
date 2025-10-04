"use client";

import { useTranslation } from 'react-i18next';
import { useState, useCallback } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO, SERVICES } from '@/lib/constants';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import debounce from 'lodash/debounce';

export default function ContactPage() {
  const { t, i18n } = useTranslation(['common', 'pages']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, { message: t('pages:contact.validation.nameRequired') }),
    email: z.string().email({ message: t('pages:contact.validation.emailInvalid') }),
    phone: z.string().regex(/^07[0-9]{8}$/, { message: t('pages:contact.validation.phoneInvalid') }),
    service: z.string().optional(),
    message: z.string().min(10, { message: t('pages:contact.validation.messageRequired') }),
  });

  const SERVICES = [
    {
      id: 'antrenament-personal',
      title: t('common:services.personal.title'),
    },
    {
      id: 'nutritie-personalizata', 
      title: t('common:services.nutrition.title'),
    },
    {
      id: 'antrenament-online',
      title: t('common:services.online.title'),
    },
    {
      id: 'program-transformare',
      title: t('common:services.transformation.title'),
    },
  ];

  const CONTACT_INFO = {
    email: 'sabinaantrenor@gmail.com',
    phone: '0787 333 500',
    address: 'B-dul 1 Decembrie 1918, nr. 291, Centrul Comercial Auchan, Tîrgu Mureș, România',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
    mode: 'onChange',
  });

  const debouncedValidation = useCallback(
    debounce((field: string, value: string) => {
      form.trigger(field as any);
    }, 300),
    []
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      
      // Send data to webhook
      const response = await fetch('https://hook.eu2.make.com/f8vxrn3dmx4kt6ma1eg74gz4higenrgt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          service: values.service,
          message: values.message,
          language: i18n.language,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      setShowSuccess(true);
      toast({
        title: t('common:contact.success'),
        description: t('common:contact.successDescription'),
      });
      form.reset();
      
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      toast({
        title: t('common:contact.error'),
        description: t('common:contact.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-accent-100/50 dark:bg-accent-900/20 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('common:contact.title')} <span className="text-primary-600">{t('common:contact.titleAccent')}</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('common:contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {t('common:contact.formTitle')} <span className="text-primary-600">{t('common:contact.formTitleAccent')}</span>
              </h2>
              
              {showSuccess && (
                <div className="success-message mb-6">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{t('common:contact.success')}</span>
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('common:contact.form.name')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('common:contact.form.namePlaceholder')}
                            {...field}
                            className={cn(
                              "transition-all duration-200 border-2 focus:border-primary-400 hover:border-primary-300",
                              form.formState.errors.name && "form-field-error"
                            )}
                            aria-invalid={!!form.formState.errors.name}
                            aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                            onChange={(e) => {
                              field.onChange(e);
                              debouncedValidation('name', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage id="name-error" role="alert" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('common:contact.form.email')}</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder={t('common:contact.form.emailPlaceholder')}
                              {...field}
                              className={cn(
                                "transition-all duration-200 border-2 focus:border-primary-400 hover:border-primary-300",
                                form.formState.errors.email && "form-field-error"
                              )}
                              aria-invalid={!!form.formState.errors.email}
                              aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                              onChange={(e) => {
                                field.onChange(e);
                                debouncedValidation('email', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage id="email-error" role="alert" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('common:contact.form.phone')}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={t('common:contact.form.phonePlaceholder')}
                              {...field}
                              className={cn(
                                "transition-all duration-200 border-2 focus:border-primary-400 hover:border-primary-300",
                                form.formState.errors.phone && "form-field-error"
                              )}
                              aria-invalid={!!form.formState.errors.phone}
                              aria-describedby={form.formState.errors.phone ? "phone-error" : undefined}
                              onChange={(e) => {
                                field.onChange(e);
                                debouncedValidation('phone', e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage id="phone-error" role="alert" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('common:contact.form.service')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                "transition-all duration-200 border-2 focus:border-primary-400 hover:border-primary-300",
                                form.formState.errors.service && "form-field-error"
                              )}
                              aria-invalid={!!form.formState.errors.service}
                              aria-describedby={form.formState.errors.service ? "service-error" : undefined}
                            >
                              <SelectValue placeholder={t('common:contact.form.servicePlaceholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SERVICES.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage id="service-error" role="alert" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('common:contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('common:contact.form.messagePlaceholder')}
                            className={cn(
                              "min-h-[120px] transition-all duration-200 border-2 focus:border-primary-400 hover:border-primary-300 resize-none",
                              form.formState.errors.message && "form-field-error"
                            )}
                            aria-invalid={!!form.formState.errors.message}
                            aria-describedby={form.formState.errors.message ? "message-error" : undefined}
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              debouncedValidation('message', e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage id="message-error" role="alert" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white"
                    disabled={isSubmitting || !form.formState.isValid}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('common:contact.form.submitting')}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        {t('common:contact.form.submit')}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">{t('common:contact.info.title')}</h2>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-6 transition-transform duration-300 hover:scale-110">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{t('common:contact.form.email')}</h3>
                    <span className="text-muted-foreground hover:text-primary-600 transition">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-6 transition-transform duration-300 hover:scale-110">
                    <Phone className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{t('common:contact.form.phone')}</h3>
                    <span className="text-muted-foreground hover:text-primary-600 transition">
                      {CONTACT_INFO.phone}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-6 transition-transform duration-300 hover:scale-110">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{t('common:footer.contact')}</h3>
                    <a 
                      href="https://www.google.com/maps/place/18+Gym+Auchan+Tudor-Targu+Mures/@46.5309835,24.5979599,17z/data=!3m1!4b1!4m6!3m5!1s0x474bb7b43baa946d:0xd452015a86f12cd7!8m2!3d46.5309835!4d24.5979599!16s%2Fg%2F11y3kdp8qy?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary-600 transition"
                    >
                      {CONTACT_INFO.address}
                    </a>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mr-6 transition-transform duration-300 hover:scale-110">
                    <Clock className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{t('common:contact.info.schedule')}</h3>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>{t('common:contact.info.hours.weekdays')}</li>
                      <li>{t('common:contact.info.hours.saturday')}</li>
                      <li>{t('common:contact.info.hours.sunday')}</li>
                      <li><em>{t('common:contact.info.hours.support')}</em></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}