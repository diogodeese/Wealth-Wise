import { login } from '@/api/login'
import { Button } from '@/app/shared/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/app/shared/components/ui/form'
import { Input } from '@/app/shared/components/ui/input'
import { setToken } from '@/utils/set-token'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Please provide a valid email address'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})

export default function Login() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (formData: z.infer<typeof loginFormSchema>) => {
    try {
      const data = await login(formData)

      await setToken(data.token)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Login failed: ', error)
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      Login
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
