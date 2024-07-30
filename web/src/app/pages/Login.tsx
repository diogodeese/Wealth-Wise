import { login } from '@/api/auth/login'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
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
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (formData: z.infer<typeof loginFormSchema>) => {
    try {
      await login(formData)
      // setTokens(data.accessToken, data.refreshToken)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: 'Invalid email or password'
      })
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage>{formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant={'ghost'}
                      onClick={togglePasswordVisibility}
                      className="absolute right-0 top-0 hover:bg-transparent"
                    >
                      {field.value.length > 0 && (
                        <>
                          {field.value && showPassword ? (
                            <EyeOff height={16} width={16} />
                          ) : (
                            <Eye height={16} width={16} />
                          )}
                        </>
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage>{formState.errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormMessage>{form.formState.errors.root?.message}</FormMessage>

          <Button type="submit" className="w-full">
            Submit
          </Button>

          <div className="text-sm">
            <p className="mt-4">
              Do not have an account yet?{' '}
              <Link to="/auth/register" className="text-blue-400">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
