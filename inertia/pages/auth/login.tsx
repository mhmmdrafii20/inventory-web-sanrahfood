import Button from "~/components/ui/Button/Button";
import Heading from "~/components/ui/Heading";
import Paragraph from "~/components/ui/Paragraph";
import { useForm, usePage } from "@inertiajs/react";
import { SubmitEvent } from "react";
import Input from "~/components/ui/Input";
import Error from "~/components/ui/Error";
export default function Login() {
    const { errors } = usePage().props;
    const { data, setData, post, reset, processing } = useForm({
        email: "",
        password: ""
    });
    function handleSignIn(e: SubmitEvent) {
        e.preventDefault();
        post('/login', {
            onSuccess: () => {
                reset();
            }
        })
    }

    return (
        <div className="flex flex-col h-200 justify-center">
            <div className=" bg-white shadow-md w-125 self-center px-10 py-5 rounded-md">
                <Heading level={1} color="dark_slate_grey">Login</Heading>
                <Heading level={3} color="dark_grey">Hai, Selamat datang kembali 🖐️</Heading>

                <form onSubmit={handleSignIn} className="flex flex-col gap-5 mt-5">
                    <div className="flex flex-col gap-3">
                        <Paragraph size="md">Email</Paragraph>
                        <Input variant={1} size="md" type="text" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Tuliskan email disini" />
                        {errors.email && <Error variant={1}>{errors.email}</Error>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <Paragraph size="md">Password</Paragraph>
                        <Input variant={1} size="md" type="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Tuliskan username disini" />
                        {errors.password && <Error variant={1}>{errors.password}</Error>}
                    </div>

                    <Button type="submit" variant={1} disabled={processing} size="md">{processing ? "Sedang masuk...." : "Login"}</Button>
                </form>
            </div>
        </div>
    )

}