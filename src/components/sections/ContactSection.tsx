import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const social = socialRef.current;

    if (!section || !title || !form || !social) return;

    // Title animation
    gsap.fromTo(title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Form animation
    gsap.fromTo(form.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: form,
          start: "top 75%",
          end: "bottom 25%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Social links animation
    gsap.fromTo(social.children,
      { opacity: 0, scale: 0.5, rotation: 180 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: social,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    // Show success message (you could add a toast here)
    alert('Message transmitted successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="min-h-screen flex items-center py-20 relative"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full grid-bg" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Contact Info */}
          <div>
            <motion.h2 
              ref={titleRef}
              className="text-4xl md:text-6xl font-tech font-bold mb-8 glow-text"
            >
              ESTABLISH_CONNECTION
            </motion.h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-lg font-body text-white/80 leading-relaxed">
                Ready to interface with the next generation of digital experiences? 
                Let's synchronize our neural networks and build something extraordinary.
              </p>
              
              <p className="text-white/60 font-body">
                Response time: &lt; 24 hours | Availability: 24/7 | 
                Encryption: End-to-end secured
              </p>
            </div>

            {/* Social Links */}
            <div ref={socialRef} className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 border border-white/30 flex items-center justify-center hover:border-white/60 hover:bg-white/5 transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-hover="true"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-tech text-white/70 mb-2 uppercase tracking-wider">
                  Identity_Protocol
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-white/40 focus:border-white/60 focus:outline-none transition-colors font-body"
                  placeholder="Enter your designation"
                  data-hover="true"
                />
              </div>

              <div>
                <label className="block text-sm font-tech text-white/70 mb-2 uppercase tracking-wider">
                  Communication_Channel
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-white/40 focus:border-white/60 focus:outline-none transition-colors font-body"
                  placeholder="neural.link@domain.net"
                  data-hover="true"
                />
              </div>

              <div>
                <label className="block text-sm font-tech text-white/70 mb-2 uppercase tracking-wider">
                  Message_Payload
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/50 border border-white/20 text-white placeholder-white/40 focus:border-white/60 focus:outline-none transition-colors font-body resize-none"
                  placeholder="Transmit your data package..."
                  data-hover="true"
                />
              </div>

              <motion.button
                type="submit"
                className="btn-sci-fi flex items-center space-x-2 w-full justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-hover="true"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Signal</span>
              </motion.button>
            </form>

            {/* Status indicator */}
            <div className="mt-8 text-center">
              <motion.div
                className="inline-flex items-center space-x-2 text-white/40 font-tech text-xs"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>COMMUNICATION_CHANNEL: ACTIVE</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};