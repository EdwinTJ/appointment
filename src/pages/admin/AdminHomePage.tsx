import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <h1 className="text-center text-3xl font-bold">
        Welcome to Admin Dashboard
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Want to see your next appointments?</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/admin/appointments/list")}>
            View Appointments
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most Booked Services</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>Haircut</li>
            <li>Color Treatment</li>
            <li>Styling</li>
            <li>Manicure</li>
            <li>Pedicure</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
