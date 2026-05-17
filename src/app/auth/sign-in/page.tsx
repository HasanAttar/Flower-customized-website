import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignInPage() { return <div className="grid min-h-screen place-items-center bg-rose-50 p-4"><Card className="w-full max-w-md"><CardHeader><CardTitle>Admin sign in</CardTitle></CardHeader><CardContent><form className="grid gap-4"><Input name="email" type="email" placeholder="Email" /><Input name="password" type="password" placeholder="Password" /><Button>Sign in</Button></form></CardContent></Card></div>; }
