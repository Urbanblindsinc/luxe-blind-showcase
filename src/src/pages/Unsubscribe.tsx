
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unsubscribe = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-display font-semibold">Urban Blinds — Unsubscribe</h1>
        <p className="text-muted-foreground">
          You've been unsubscribed and will no longer receive marketing emails from us.
        </p>
        <Button onClick={() => navigate("/")} variant="outline">Return Home</Button>
      </div>
    </main>
  );
};

export default Unsubscribe;
