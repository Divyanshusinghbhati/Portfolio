import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-portfolio";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { mutate, isPending: isSaving } = useSendMessage();
  const { toast } = useToast();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: InsertMessage) => {
    try {
      // Send via EmailJS
      await emailjs.send(
        "service_quuil8n",
        "__ejs-test-mail-service__",
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_name: "Divyanshu",
        },
        "b_eeZiMcMxo8pyYQ-"
      );

      // Still save to database for backup/tracking
      mutate(data, {
        onSuccess: () => {
          form.reset();
          toast({
            title: "Message sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
          });
        }
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Error",
        description: "Failed to send email. Please try again later.",
        variant: "destructive"
      });
    }
  };

  const isPending = isSaving || form.formState.isSubmitting;

  return (
    <motion.form 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
          <input
            id="name"
            {...form.register("name")}
            className="w-full px-4 py-3 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/50"
            placeholder="Your Name"
          />
          {form.formState.errors.name && (
            <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
          <input
            id="email"
            type="email"
            {...form.register("email")}
            className="w-full px-4 py-3 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/50"
            placeholder="john@example.com"
          />
          {form.formState.errors.email && (
            <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
        <textarea
          id="message"
          rows={5}
          {...form.register("message")}
          className="w-full px-4 py-3 rounded-lg bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
          placeholder="How can we work together?"
        />
        {form.formState.errors.message && (
          <p className="text-destructive text-sm">{form.formState.errors.message.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isPending}
        className="w-full md:w-auto px-8 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Sending...
          </>
        ) : (
          <>
            <Send size={20} />
            Send Message
          </>
        )}
      </button>
    </motion.form>
  );
}
