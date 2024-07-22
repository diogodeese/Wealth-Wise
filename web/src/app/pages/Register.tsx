import { register } from '@/api/auth/register'
import { useCountries } from '@/api/get-countries'
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
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const registerFormSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Please provide a valid email address' }),
    alternativeEmail: z.string().email().optional(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Please confirm your password' }),
    name: z.string().min(1, { message: 'Name is required' }),
    surname: z.string().min(1, { message: 'Surname is required' }),
    country: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
  })
  .refine((data) => data.email !== data.alternativeEmail, {
    path: ['alternativeEmail'],
    message: 'Alternative email cannot be the same as primary email'
  })

export default function Register() {
  const navigate = useNavigate()
  const { data: countries, isLoading } = useCountries()

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      alternativeEmail: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: '',
      country: ''
    }
  })

  const onSubmit = async (formData: z.infer<typeof registerFormSchema>) => {
    try {
      await register(formData)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Registration failed: ', error)
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Register</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>{formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surname"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Surname *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage>{formState.errors.surname?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage>{formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alternativeEmail"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Alternative Email (Optional)</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage>
                  {formState.errors.alternativeEmail?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage>{formState.errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Confirm Password *</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage>
                  {formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="country"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Select {...field}>
                    {isLoading ? (
                      <option>Loading...</option>
                    ) : (
                      countries?.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))
                    )}
                  </Select>
                </FormControl>
                <FormMessage>{formState.errors.country?.message}</FormMessage>
              </FormItem>
            )}
          /> */}

          <Button type="submit" className="w-full">
            Register
          </Button>

          <div className="mt-4 text-sm">
            <p>
              Already have an account?{' '}
              <Link to="/auth/sign-in" className="text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  )
}
