import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Fish, Dna } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import cmlreLogo from '@/assets/cmlre-logo.png';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const demoUsers = [
    { email: 'user@cmlre.gov.in', role: 'User (General Scientist)' },
    { email: 'researcher@cmlre.gov.in', role: 'Researcher' },
    { email: 'admin@cmlre.gov.in', role: 'Admin' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-ocean-deep via-ocean-medium to-ocean-shallow">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-card/95 border-ocean-surface/20">
          <CardHeader className="text-center space-y-4">
            <motion.div
              className="mx-auto"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <img src={cmlreLogo} alt="CMLRE Logo" className="w-20 h-20 mx-auto" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-ocean-deep to-ocean-surface bg-clip-text text-transparent">
                CMLRE Marine Data Platform
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Central Marine Living Resources & Ecology
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@cmlre.gov.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-ocean-medium to-ocean-shallow hover:from-ocean-deep hover:to-ocean-medium transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Waves className="w-4 h-4" />
                    </motion.div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground text-center">
                Demo Accounts (use any password):
              </div>
              <div className="space-y-2">
                {demoUsers.map((user, index) => (
                  <motion.button
                    key={user.email}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setEmail(user.email)}
                    className="w-full text-xs text-left p-2 rounded border border-ocean-surface/30 hover:bg-ocean-surface/10 transition-colors"
                  >
                    <div className="font-medium">{user.email}</div>
                    <div className="text-muted-foreground">{user.role}</div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <Waves className="w-6 h-6 text-ocean-surface" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Fish className="w-6 h-6 text-coral-cool" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Dna className="w-6 h-6 text-coral-warm" />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};