import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserCircle, Bell, Shield, Lock, LogOut, Edit3, Camera, Trash2, Palette, Languages } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  username: z.string().min(3, { message: "Username must be at least 3 characters." }).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
  bio: z.string().max(160, { message: "Bio must not exceed 160 characters." }).optional(),
  email: z.string().email(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string().min(6, "New password must be at least 6 characters."),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "New passwords don't match.",
  path: ["confirmNewPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const SettingsPage = () => {
  const navigate = useNavigate();
  // Mock user data
  const [currentUser, setCurrentUser] = useState({
    fullName: 'John Doe',
    username: 'johndoe',
    bio: 'Lover of code and coffee.',
    email: 'user@example.com', // This should match the login email for consistency
    avatar: 'https://source.unsplash.com/random/128x128?profile&sig=99',
  });

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: currentUser.fullName,
      username: currentUser.username,
      bio: currentUser.bio,
      email: currentUser.email,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });
  
  const [notifications, setNotifications] = useState({
    messagePreviews: true,
    sound: false,
    desktopAlerts: true,
  });

  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log('Profile updated', data);
    setCurrentUser(prev => ({...prev, ...data}));
    // Show success toast
  };

  const onPasswordSubmit = (data: PasswordFormValues) => {
    console.log('Password change submitted', data);
    // Show success toast, clear form
    passwordForm.reset();
  };
  
  const handleLogout = () => {
    console.log("User logged out from settings");
    navigate('/auth');
  };

  console.log('SettingsPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 dark:bg-gray-900">
      <Header title="Settings" showBackButton onBackButtonClick={() => navigate('/')} />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="profile"><UserCircle className="mr-2 h-4 w-4" />Profile</TabsTrigger>
            <TabsTrigger value="account"><Lock className="mr-2 h-4 w-4" />Account</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
            <TabsTrigger value="appearance"><Palette className="mr-2 h-4 w-4" />Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Settings Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your public profile information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                      <AvatarFallback>{currentUser.fullName.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm">
                        <Camera className="h-4 w-4"/>
                        <span className="sr-only">Change avatar</span>
                    </Button>
                  </div>
                  <div>
                     <Button variant="outline"><Edit3 className="mr-2 h-4 w-4" /> Edit Avatar</Button>
                     <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField control={profileForm.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={profileForm.control} name="username" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl><Input placeholder="Your unique username" {...field} /></FormControl>
                         <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                     <FormField control={profileForm.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="Your email address" {...field} disabled /></FormControl>
                         <FormDescription>Your email is not publicly visible.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={profileForm.control} name="bio" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl><Textarea placeholder="Tell us a little about yourself" className="resize-none" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit">Save Profile</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account security and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl><Input type="password" placeholder="Enter current password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl><Input type="password" placeholder="Enter new password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={passwordForm.control} name="confirmNewPassword" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl><Input type="password" placeholder="Confirm new password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <Button type="submit">Change Password</Button>
                  </form>
                </Form>
                <hr/>
                <div>
                    <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-2">Manage sensitive account actions.</p>
                    <Button variant="destructive" onClick={() => alert("Delete account action!")}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                    </Button>
                     <p className="text-xs text-muted-foreground mt-1">Once you delete your account, there is no going back. Please be certain.</p>
                </div>
                 <hr/>
                 <div className="space-y-2">
                    <h3 className="text-lg font-medium">Logout</h3>
                    <p className="text-sm text-muted-foreground">Log out from your current session.</p>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                  <FormLabel htmlFor="message-previews" className="font-normal">Show Message Previews</FormLabel>
                  <Switch id="message-previews" checked={notifications.messagePreviews} onCheckedChange={(checked) => setNotifications(p => ({...p, messagePreviews: checked}))} />
                </div>
                <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                  <FormLabel htmlFor="sound-notifications" className="font-normal">Sound Notifications</FormLabel>
                  <Switch id="sound-notifications" checked={notifications.sound} onCheckedChange={(checked) => setNotifications(p => ({...p, sound: checked}))} />
                </div>
                 <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                  <FormLabel htmlFor="desktop-alerts" className="font-normal">Desktop Alerts</FormLabel>
                  <Switch id="desktop-alerts" checked={notifications.desktopAlerts} onCheckedChange={(checked) => setNotifications(p => ({...p, desktopAlerts: checked}))} />
                </div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Advanced Notification Settings</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">Configure specific notification types, like mentions or group activity.</p>
                       <Button variant="outline" size="sm">Customize Advanced Notifications</Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter>
                <Button onClick={() => console.log("Notification settings saved:", notifications)}>Save Notification Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings Tab */}
           <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                  <FormLabel htmlFor="dark-mode" className="font-normal flex items-center"><Palette className="mr-2 h-4 w-4"/> Theme</FormLabel>
                  <div className="flex gap-2">
                    <Button variant={!document.documentElement.classList.contains('dark') ? 'default' : 'outline'} onClick={() => {document.documentElement.classList.remove('dark'); localStorage.theme = 'light'}}>Light</Button>
                    <Button variant={document.documentElement.classList.contains('dark') ? 'default' : 'outline'} onClick={() => {document.documentElement.classList.add('dark'); localStorage.theme = 'dark'}}>Dark</Button>
                  </div>
                </div>
                 <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                  <FormLabel htmlFor="language" className="font-normal flex items-center"><Languages className="mr-2 h-4 w-4"/> Language</FormLabel>
                    <Button variant="outline" onClick={() => alert("Language settings not implemented.")}>English (US)</Button>
                </div>
                 {/* Add more appearance settings here, e.g., font size, themes etc. */}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
};

export default SettingsPage;