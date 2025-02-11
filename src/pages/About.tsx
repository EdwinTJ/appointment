import { Phone, Mail, Instagram } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutMe() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover border-4 border-primary"
          />
        </div>
        <CardTitle className="text-2xl font-bold">Jane Smith</CardTitle>
        <p className="text-muted-foreground mt-2">
          Professional Hair Stylist with over 8 years of experience specializing
          in creative coloring and precision cuts. Passionate about helping
          clients express their unique style through personalized hair care
          solutions.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-primary" />
            <a
              href="tel:+1234567890"
              className="hover:text-primary transition-colors"
            >
              (123) 456-7890
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-primary" />
            <a
              href="mailto:jane.smith@example.com"
              className="hover:text-primary transition-colors"
            >
              jane.smith@example.com
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Instagram className="w-5 h-5 text-primary" />
            <a
              href="https://instagram.com/janesmithhair"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              @janesmithhair
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            <a
              href="https://tiktok.com/@janesmithhair"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              @janesmithhair
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AboutMe;
