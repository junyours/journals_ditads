import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const handleConfirm = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <form onSubmit={handleConfirm}>
                <CardHeader>
                    <CardTitle>Confirm Password</CardTitle>
                    <CardDescription>
                        This is a secure area of the application. Please confirm your
                        password before continuing.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {errors.email && (
                            <Alert variant="destructive">
                                <AlertDescription>
                                    {errors.email}
                                </AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-1">
                            <Label>Password</Label>
                            <InputPassword value={data.password} onChange={(e) => setData('password', e.target.value)} required />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={processing}>
                        Confirm
                    </Button>
                </CardFooter>
            </form>
        </GuestLayout>
    );
}
