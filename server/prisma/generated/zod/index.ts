import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','name','surname','profilePicture','createdAt','updatedAt','country','alternativeEmail','currencyPreference','languagePreference','twoFactorEnabled','twoFactorSecret']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','balance','savings','emergencySavings']);

export const ExpenseCategoryScalarFieldEnumSchema = z.enum(['id','name','description','essential','budgetCap','colorCode']);

export const UserExpenseCategoryScalarFieldEnumSchema = z.enum(['userId','expenseCategoryId']);

export const ExpenseScalarFieldEnumSchema = z.enum(['id','userId','amount','description','categoryId','date','createdAt']);

export const RecurringExpenseScalarFieldEnumSchema = z.enum(['id','userId','amount','description','categoryId','recurrenceDay','createdAt','updatedAt']);

export const CurrencyScalarFieldEnumSchema = z.enum(['id','code','name','symbol','active']);

export const CountryScalarFieldEnumSchema = z.enum(['id','code','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  country: z.string().nullable(),
  alternativeEmail: z.string().nullable(),
  currencyPreference: z.string().nullable(),
  languagePreference: z.string().nullable(),
  twoFactorEnabled: z.boolean(),
  twoFactorSecret: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  balance: z.number(),
  savings: z.number(),
  emergencySavings: z.number(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// EXPENSE CATEGORY SCHEMA
/////////////////////////////////////////

export const ExpenseCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  essential: z.boolean(),
  budgetCap: z.number().nullable(),
  colorCode: z.string().nullable(),
})

export type ExpenseCategory = z.infer<typeof ExpenseCategorySchema>

/////////////////////////////////////////
// USER EXPENSE CATEGORY SCHEMA
/////////////////////////////////////////

export const UserExpenseCategorySchema = z.object({
  userId: z.string(),
  expenseCategoryId: z.string(),
})

export type UserExpenseCategory = z.infer<typeof UserExpenseCategorySchema>

/////////////////////////////////////////
// EXPENSE SCHEMA
/////////////////////////////////////////

export const ExpenseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export type Expense = z.infer<typeof ExpenseSchema>

/////////////////////////////////////////
// RECURRING EXPENSE SCHEMA
/////////////////////////////////////////

export const RecurringExpenseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RecurringExpense = z.infer<typeof RecurringExpenseSchema>

/////////////////////////////////////////
// CURRENCY SCHEMA
/////////////////////////////////////////

export const CurrencySchema = z.object({
  id: z.number().int(),
  code: z.string(),
  name: z.string(),
  symbol: z.string().nullable(),
  active: z.boolean(),
})

export type Currency = z.infer<typeof CurrencySchema>

/////////////////////////////////////////
// COUNTRY SCHEMA
/////////////////////////////////////////

export const CountrySchema = z.object({
  id: z.number().int(),
  code: z.string(),
  name: z.string(),
})

export type Country = z.infer<typeof CountrySchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  expenses: z.union([z.boolean(),z.lazy(() => ExpenseFindManyArgsSchema)]).optional(),
  UserExpenseCategory: z.union([z.boolean(),z.lazy(() => UserExpenseCategoryFindManyArgsSchema)]).optional(),
  RecurringExpense: z.union([z.boolean(),z.lazy(() => RecurringExpenseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  expenses: z.boolean().optional(),
  UserExpenseCategory: z.boolean().optional(),
  RecurringExpense: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  name: z.boolean().optional(),
  surname: z.boolean().optional(),
  profilePicture: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  country: z.boolean().optional(),
  alternativeEmail: z.boolean().optional(),
  currencyPreference: z.boolean().optional(),
  languagePreference: z.boolean().optional(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.boolean().optional(),
  account: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  expenses: z.union([z.boolean(),z.lazy(() => ExpenseFindManyArgsSchema)]).optional(),
  UserExpenseCategory: z.union([z.boolean(),z.lazy(() => UserExpenseCategoryFindManyArgsSchema)]).optional(),
  RecurringExpense: z.union([z.boolean(),z.lazy(() => RecurringExpenseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  balance: z.boolean().optional(),
  savings: z.boolean().optional(),
  emergencySavings: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// EXPENSE CATEGORY
//------------------------------------------------------

export const ExpenseCategoryIncludeSchema: z.ZodType<Prisma.ExpenseCategoryInclude> = z.object({
  expenses: z.union([z.boolean(),z.lazy(() => ExpenseFindManyArgsSchema)]).optional(),
  UserExpenseCategory: z.union([z.boolean(),z.lazy(() => UserExpenseCategoryFindManyArgsSchema)]).optional(),
  RecurringExpense: z.union([z.boolean(),z.lazy(() => RecurringExpenseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExpenseCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ExpenseCategoryArgsSchema: z.ZodType<Prisma.ExpenseCategoryDefaultArgs> = z.object({
  select: z.lazy(() => ExpenseCategorySelectSchema).optional(),
  include: z.lazy(() => ExpenseCategoryIncludeSchema).optional(),
}).strict();

export const ExpenseCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.ExpenseCategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ExpenseCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ExpenseCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.ExpenseCategoryCountOutputTypeSelect> = z.object({
  expenses: z.boolean().optional(),
  UserExpenseCategory: z.boolean().optional(),
  RecurringExpense: z.boolean().optional(),
}).strict();

export const ExpenseCategorySelectSchema: z.ZodType<Prisma.ExpenseCategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  essential: z.boolean().optional(),
  budgetCap: z.boolean().optional(),
  colorCode: z.boolean().optional(),
  expenses: z.union([z.boolean(),z.lazy(() => ExpenseFindManyArgsSchema)]).optional(),
  UserExpenseCategory: z.union([z.boolean(),z.lazy(() => UserExpenseCategoryFindManyArgsSchema)]).optional(),
  RecurringExpense: z.union([z.boolean(),z.lazy(() => RecurringExpenseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ExpenseCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER EXPENSE CATEGORY
//------------------------------------------------------

export const UserExpenseCategoryIncludeSchema: z.ZodType<Prisma.UserExpenseCategoryInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  expenseCategory: z.union([z.boolean(),z.lazy(() => ExpenseCategoryArgsSchema)]).optional(),
}).strict()

export const UserExpenseCategoryArgsSchema: z.ZodType<Prisma.UserExpenseCategoryDefaultArgs> = z.object({
  select: z.lazy(() => UserExpenseCategorySelectSchema).optional(),
  include: z.lazy(() => UserExpenseCategoryIncludeSchema).optional(),
}).strict();

export const UserExpenseCategorySelectSchema: z.ZodType<Prisma.UserExpenseCategorySelect> = z.object({
  userId: z.boolean().optional(),
  expenseCategoryId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  expenseCategory: z.union([z.boolean(),z.lazy(() => ExpenseCategoryArgsSchema)]).optional(),
}).strict()

// EXPENSE
//------------------------------------------------------

export const ExpenseIncludeSchema: z.ZodType<Prisma.ExpenseInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => ExpenseCategoryArgsSchema)]).optional(),
}).strict()

export const ExpenseArgsSchema: z.ZodType<Prisma.ExpenseDefaultArgs> = z.object({
  select: z.lazy(() => ExpenseSelectSchema).optional(),
  include: z.lazy(() => ExpenseIncludeSchema).optional(),
}).strict();

export const ExpenseSelectSchema: z.ZodType<Prisma.ExpenseSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  amount: z.boolean().optional(),
  description: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  date: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => ExpenseCategoryArgsSchema)]).optional(),
}).strict()

// RECURRING EXPENSE
//------------------------------------------------------

export const RecurringExpenseIncludeSchema: z.ZodType<Prisma.RecurringExpenseInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => ExpenseCategoryArgsSchema)]).optional(),
}).strict()

export const RecurringExpenseArgsSchema: z.ZodType<Prisma.RecurringExpenseDefaultArgs> = z.object({
  select: z.lazy(() => RecurringExpenseSelectSchema).optional(),
  include: z.lazy(() => RecurringExpenseIncludeSchema).optional(),
}).strict();

export const RecurringExpenseSelectSchema: z.ZodType<Prisma.RecurringExpenseSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  amount: z.boolean().optional(),
  description: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  recurrenceDay: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => ExpenseCategoryArgsSchema)]).optional(),
}).strict()

// CURRENCY
//------------------------------------------------------

export const CurrencyIncludeSchema: z.ZodType<Prisma.CurrencyInclude> = z.object({
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CurrencyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CurrencyArgsSchema: z.ZodType<Prisma.CurrencyDefaultArgs> = z.object({
  select: z.lazy(() => CurrencySelectSchema).optional(),
  include: z.lazy(() => CurrencyIncludeSchema).optional(),
}).strict();

export const CurrencyCountOutputTypeArgsSchema: z.ZodType<Prisma.CurrencyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CurrencyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CurrencyCountOutputTypeSelectSchema: z.ZodType<Prisma.CurrencyCountOutputTypeSelect> = z.object({
  countries: z.boolean().optional(),
}).strict();

export const CurrencySelectSchema: z.ZodType<Prisma.CurrencySelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  symbol: z.boolean().optional(),
  active: z.boolean().optional(),
  countries: z.union([z.boolean(),z.lazy(() => CountryFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CurrencyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COUNTRY
//------------------------------------------------------

export const CountryIncludeSchema: z.ZodType<Prisma.CountryInclude> = z.object({
  currencies: z.union([z.boolean(),z.lazy(() => CurrencyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CountryArgsSchema: z.ZodType<Prisma.CountryDefaultArgs> = z.object({
  select: z.lazy(() => CountrySelectSchema).optional(),
  include: z.lazy(() => CountryIncludeSchema).optional(),
}).strict();

export const CountryCountOutputTypeArgsSchema: z.ZodType<Prisma.CountryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CountryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CountryCountOutputTypeSelectSchema: z.ZodType<Prisma.CountryCountOutputTypeSelect> = z.object({
  currencies: z.boolean().optional(),
}).strict();

export const CountrySelectSchema: z.ZodType<Prisma.CountrySelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  currencies: z.union([z.boolean(),z.lazy(() => CurrencyFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CountryCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  surname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profilePicture: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alternativeEmail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  currencyPreference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  languagePreference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  twoFactorSecret: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  account: z.union([ z.lazy(() => AccountNullableRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseListRelationFilterSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryListRelationFilterSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  surname: z.lazy(() => SortOrderSchema).optional(),
  profilePicture: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  country: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alternativeEmail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  currencyPreference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  languagePreference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  twoFactorSecret: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  account: z.lazy(() => AccountOrderByWithRelationInputSchema).optional(),
  expenses: z.lazy(() => ExpenseOrderByRelationAggregateInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryOrderByRelationAggregateInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  surname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profilePicture: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  alternativeEmail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  currencyPreference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  languagePreference: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  twoFactorSecret: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  account: z.union([ z.lazy(() => AccountNullableRelationFilterSchema),z.lazy(() => AccountWhereInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseListRelationFilterSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryListRelationFilterSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  surname: z.lazy(() => SortOrderSchema).optional(),
  profilePicture: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  country: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  alternativeEmail: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  currencyPreference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  languagePreference: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  twoFactorSecret: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  surname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  profilePicture: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  alternativeEmail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  currencyPreference: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  languagePreference: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  twoFactorSecret: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  balance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  savings: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  emergencySavings: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  savings: z.lazy(() => SortOrderSchema).optional(),
  emergencySavings: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userId: z.string(),
    id_userId: z.lazy(() => AccountIdUserIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
    userId: z.string(),
  }),
  z.object({
    id: z.string(),
    id_userId: z.lazy(() => AccountIdUserIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userId: z.string(),
    id_userId: z.lazy(() => AccountIdUserIdCompoundUniqueInputSchema),
  }),
  z.object({
    userId: z.string(),
  }),
  z.object({
    id_userId: z.lazy(() => AccountIdUserIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  id_userId: z.lazy(() => AccountIdUserIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  balance: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  savings: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  emergencySavings: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  savings: z.lazy(() => SortOrderSchema).optional(),
  emergencySavings: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  balance: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  savings: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  emergencySavings: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ExpenseCategoryWhereInputSchema: z.ZodType<Prisma.ExpenseCategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExpenseCategoryWhereInputSchema),z.lazy(() => ExpenseCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseCategoryWhereInputSchema),z.lazy(() => ExpenseCategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  essential: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  budgetCap: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  colorCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseListRelationFilterSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryListRelationFilterSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseListRelationFilterSchema).optional()
}).strict();

export const ExpenseCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.ExpenseCategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  essential: z.lazy(() => SortOrderSchema).optional(),
  budgetCap: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  colorCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expenses: z.lazy(() => ExpenseOrderByRelationAggregateInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryOrderByRelationAggregateInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ExpenseCategoryWhereUniqueInputSchema: z.ZodType<Prisma.ExpenseCategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => ExpenseCategoryWhereInputSchema),z.lazy(() => ExpenseCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseCategoryWhereInputSchema),z.lazy(() => ExpenseCategoryWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  essential: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  budgetCap: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  colorCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseListRelationFilterSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryListRelationFilterSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseListRelationFilterSchema).optional()
}).strict());

export const ExpenseCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExpenseCategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  essential: z.lazy(() => SortOrderSchema).optional(),
  budgetCap: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  colorCode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ExpenseCategoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ExpenseCategoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExpenseCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExpenseCategoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ExpenseCategorySumOrderByAggregateInputSchema).optional()
}).strict();

export const ExpenseCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExpenseCategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExpenseCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => ExpenseCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => ExpenseCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  essential: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  budgetCap: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  colorCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserExpenseCategoryWhereInputSchema: z.ZodType<Prisma.UserExpenseCategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserExpenseCategoryWhereInputSchema),z.lazy(() => UserExpenseCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserExpenseCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserExpenseCategoryWhereInputSchema),z.lazy(() => UserExpenseCategoryWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expenseCategoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  expenseCategory: z.union([ z.lazy(() => ExpenseCategoryRelationFilterSchema),z.lazy(() => ExpenseCategoryWhereInputSchema) ]).optional(),
}).strict();

export const UserExpenseCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.UserExpenseCategoryOrderByWithRelationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  expenseCategoryId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  expenseCategory: z.lazy(() => ExpenseCategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const UserExpenseCategoryWhereUniqueInputSchema: z.ZodType<Prisma.UserExpenseCategoryWhereUniqueInput> = z.object({
  userId_expenseCategoryId: z.lazy(() => UserExpenseCategoryUserIdExpenseCategoryIdCompoundUniqueInputSchema)
})
.and(z.object({
  userId_expenseCategoryId: z.lazy(() => UserExpenseCategoryUserIdExpenseCategoryIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserExpenseCategoryWhereInputSchema),z.lazy(() => UserExpenseCategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserExpenseCategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserExpenseCategoryWhereInputSchema),z.lazy(() => UserExpenseCategoryWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expenseCategoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  expenseCategory: z.union([ z.lazy(() => ExpenseCategoryRelationFilterSchema),z.lazy(() => ExpenseCategoryWhereInputSchema) ]).optional(),
}).strict());

export const UserExpenseCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserExpenseCategoryOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  expenseCategoryId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserExpenseCategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserExpenseCategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserExpenseCategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserExpenseCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserExpenseCategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserExpenseCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => UserExpenseCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserExpenseCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserExpenseCategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => UserExpenseCategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expenseCategoryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ExpenseWhereInputSchema: z.ZodType<Prisma.ExpenseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExpenseWhereInputSchema),z.lazy(() => ExpenseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseWhereInputSchema),z.lazy(() => ExpenseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => ExpenseCategoryRelationFilterSchema),z.lazy(() => ExpenseCategoryWhereInputSchema) ]).optional(),
}).strict();

export const ExpenseOrderByWithRelationInputSchema: z.ZodType<Prisma.ExpenseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => ExpenseCategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const ExpenseWhereUniqueInputSchema: z.ZodType<Prisma.ExpenseWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ExpenseWhereInputSchema),z.lazy(() => ExpenseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseWhereInputSchema),z.lazy(() => ExpenseWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => ExpenseCategoryRelationFilterSchema),z.lazy(() => ExpenseCategoryWhereInputSchema) ]).optional(),
}).strict());

export const ExpenseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExpenseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExpenseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ExpenseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExpenseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExpenseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ExpenseSumOrderByAggregateInputSchema).optional()
}).strict();

export const ExpenseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExpenseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RecurringExpenseWhereInputSchema: z.ZodType<Prisma.RecurringExpenseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecurringExpenseWhereInputSchema),z.lazy(() => RecurringExpenseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecurringExpenseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecurringExpenseWhereInputSchema),z.lazy(() => RecurringExpenseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recurrenceDay: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => ExpenseCategoryRelationFilterSchema),z.lazy(() => ExpenseCategoryWhereInputSchema) ]).optional(),
}).strict();

export const RecurringExpenseOrderByWithRelationInputSchema: z.ZodType<Prisma.RecurringExpenseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  recurrenceDay: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => ExpenseCategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const RecurringExpenseWhereUniqueInputSchema: z.ZodType<Prisma.RecurringExpenseWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => RecurringExpenseWhereInputSchema),z.lazy(() => RecurringExpenseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecurringExpenseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecurringExpenseWhereInputSchema),z.lazy(() => RecurringExpenseWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recurrenceDay: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => ExpenseCategoryRelationFilterSchema),z.lazy(() => ExpenseCategoryWhereInputSchema) ]).optional(),
}).strict());

export const RecurringExpenseOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecurringExpenseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  recurrenceDay: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecurringExpenseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecurringExpenseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecurringExpenseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecurringExpenseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecurringExpenseSumOrderByAggregateInputSchema).optional()
}).strict();

export const RecurringExpenseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RecurringExpenseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RecurringExpenseScalarWhereWithAggregatesInputSchema),z.lazy(() => RecurringExpenseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecurringExpenseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecurringExpenseScalarWhereWithAggregatesInputSchema),z.lazy(() => RecurringExpenseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  recurrenceDay: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CurrencyWhereInputSchema: z.ZodType<Prisma.CurrencyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CurrencyWhereInputSchema),z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyWhereInputSchema),z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  symbol: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict();

export const CurrencyOrderByWithRelationInputSchema: z.ZodType<Prisma.CurrencyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  countries: z.lazy(() => CountryOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CurrencyWhereUniqueInputSchema: z.ZodType<Prisma.CurrencyWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => CurrencyWhereInputSchema),z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyWhereInputSchema),z.lazy(() => CurrencyWhereInputSchema).array() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  symbol: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  countries: z.lazy(() => CountryListRelationFilterSchema).optional()
}).strict());

export const CurrencyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CurrencyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CurrencyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CurrencyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CurrencyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CurrencyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CurrencySumOrderByAggregateInputSchema).optional()
}).strict();

export const CurrencyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CurrencyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema),z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema),z.lazy(() => CurrencyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  symbol: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const CountryWhereInputSchema: z.ZodType<Prisma.CountryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  currencies: z.lazy(() => CurrencyListRelationFilterSchema).optional()
}).strict();

export const CountryOrderByWithRelationInputSchema: z.ZodType<Prisma.CountryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  currencies: z.lazy(() => CurrencyOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CountryWhereUniqueInputSchema: z.ZodType<Prisma.CountryWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    code: z.string(),
    name: z.string(),
    code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
    code: z.string(),
    name: z.string(),
  }),
  z.object({
    id: z.number().int(),
    code: z.string(),
    code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
    code: z.string(),
  }),
  z.object({
    id: z.number().int(),
    name: z.string(),
    code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
    name: z.string(),
  }),
  z.object({
    id: z.number().int(),
    code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    code: z.string(),
    name: z.string(),
    code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema),
  }),
  z.object({
    code: z.string(),
    name: z.string(),
  }),
  z.object({
    code: z.string(),
    code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema),
  }),
  z.object({
    code: z.string(),
  }),
  z.object({
    name: z.string(),
    code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema),
  }),
  z.object({
    name: z.string(),
  }),
  z.object({
    code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  code: z.string().optional(),
  name: z.string().optional(),
  code_name: z.lazy(() => CountryCodeNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryWhereInputSchema),z.lazy(() => CountryWhereInputSchema).array() ]).optional(),
  currencies: z.lazy(() => CurrencyListRelationFilterSchema).optional()
}).strict());

export const CountryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CountryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CountryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CountryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CountryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CountryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CountrySumOrderByAggregateInputSchema).optional()
}).strict();

export const CountryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CountryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema),z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryScalarWhereWithAggregatesInputSchema),z.lazy(() => CountryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  account: z.lazy(() => AccountCreateNestedOneWithoutUserInputSchema).optional(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutUserInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryCreateNestedManyWithoutUserInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  account: z.lazy(() => AccountUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  account: z.lazy(() => AccountUpdateOneWithoutUserNestedInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUpdateManyWithoutUserNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  account: z.lazy(() => AccountUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().optional(),
  balance: z.number(),
  savings: z.number(),
  emergencySavings: z.number(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  balance: z.number(),
  savings: z.number(),
  emergencySavings: z.number()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  savings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  emergencySavings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  savings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  emergencySavings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  balance: z.number(),
  savings: z.number(),
  emergencySavings: z.number()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  savings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  emergencySavings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  savings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  emergencySavings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseCategoryCreateInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryCreateNestedManyWithoutExpenseCategoryInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const ExpenseCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedCreateNestedManyWithoutExpenseCategoryInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const ExpenseCategoryUpdateInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutCategoryNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUpdateManyWithoutExpenseCategoryNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const ExpenseCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutExpenseCategoryNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const ExpenseCategoryCreateManyInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable()
}).strict();

export const ExpenseCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExpenseCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserExpenseCategoryCreateInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateInput> = z.object({
  user: z.lazy(() => UserCreateNestedOneWithoutUserExpenseCategoryInputSchema),
  expenseCategory: z.lazy(() => ExpenseCategoryCreateNestedOneWithoutUserExpenseCategoryInputSchema)
}).strict();

export const UserExpenseCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedCreateInput> = z.object({
  userId: z.string(),
  expenseCategoryId: z.string()
}).strict();

export const UserExpenseCategoryUpdateInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateInput> = z.object({
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserExpenseCategoryNestedInputSchema).optional(),
  expenseCategory: z.lazy(() => ExpenseCategoryUpdateOneRequiredWithoutUserExpenseCategoryNestedInputSchema).optional()
}).strict();

export const UserExpenseCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expenseCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserExpenseCategoryCreateManyInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateManyInput> = z.object({
  userId: z.string(),
  expenseCategoryId: z.string()
}).strict();

export const UserExpenseCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateManyMutationInput> = z.object({
}).strict();

export const UserExpenseCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expenseCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseCreateInputSchema: z.ZodType<Prisma.ExpenseCreateInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutExpensesInputSchema),
  category: z.lazy(() => ExpenseCategoryCreateNestedOneWithoutExpensesInputSchema)
}).strict();

export const ExpenseUncheckedCreateInputSchema: z.ZodType<Prisma.ExpenseUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ExpenseUpdateInputSchema: z.ZodType<Prisma.ExpenseUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExpensesNestedInputSchema).optional(),
  category: z.lazy(() => ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInputSchema).optional()
}).strict();

export const ExpenseUncheckedUpdateInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseCreateManyInputSchema: z.ZodType<Prisma.ExpenseCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ExpenseUpdateManyMutationInputSchema: z.ZodType<Prisma.ExpenseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecurringExpenseCreateInputSchema: z.ZodType<Prisma.RecurringExpenseCreateInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRecurringExpenseInputSchema),
  category: z.lazy(() => ExpenseCategoryCreateNestedOneWithoutRecurringExpenseInputSchema)
}).strict();

export const RecurringExpenseUncheckedCreateInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RecurringExpenseUpdateInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRecurringExpenseNestedInputSchema).optional(),
  category: z.lazy(() => ExpenseCategoryUpdateOneRequiredWithoutRecurringExpenseNestedInputSchema).optional()
}).strict();

export const RecurringExpenseUncheckedUpdateInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecurringExpenseCreateManyInputSchema: z.ZodType<Prisma.RecurringExpenseCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RecurringExpenseUpdateManyMutationInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecurringExpenseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CurrencyCreateInputSchema: z.ZodType<Prisma.CurrencyCreateInput> = z.object({
  code: z.string(),
  name: z.string(),
  symbol: z.string().optional().nullable(),
  active: z.boolean().optional(),
  countries: z.lazy(() => CountryCreateNestedManyWithoutCurrenciesInputSchema).optional()
}).strict();

export const CurrencyUncheckedCreateInputSchema: z.ZodType<Prisma.CurrencyUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  symbol: z.string().optional().nullable(),
  active: z.boolean().optional(),
  countries: z.lazy(() => CountryUncheckedCreateNestedManyWithoutCurrenciesInputSchema).optional()
}).strict();

export const CurrencyUpdateInputSchema: z.ZodType<Prisma.CurrencyUpdateInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  countries: z.lazy(() => CountryUpdateManyWithoutCurrenciesNestedInputSchema).optional()
}).strict();

export const CurrencyUncheckedUpdateInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  countries: z.lazy(() => CountryUncheckedUpdateManyWithoutCurrenciesNestedInputSchema).optional()
}).strict();

export const CurrencyCreateManyInputSchema: z.ZodType<Prisma.CurrencyCreateManyInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  symbol: z.string().optional().nullable(),
  active: z.boolean().optional()
}).strict();

export const CurrencyUpdateManyMutationInputSchema: z.ZodType<Prisma.CurrencyUpdateManyMutationInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CurrencyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryCreateInputSchema: z.ZodType<Prisma.CountryCreateInput> = z.object({
  code: z.string(),
  name: z.string(),
  currencies: z.lazy(() => CurrencyCreateNestedManyWithoutCountriesInputSchema).optional()
}).strict();

export const CountryUncheckedCreateInputSchema: z.ZodType<Prisma.CountryUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  currencies: z.lazy(() => CurrencyUncheckedCreateNestedManyWithoutCountriesInputSchema).optional()
}).strict();

export const CountryUpdateInputSchema: z.ZodType<Prisma.CountryUpdateInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currencies: z.lazy(() => CurrencyUpdateManyWithoutCountriesNestedInputSchema).optional()
}).strict();

export const CountryUncheckedUpdateInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currencies: z.lazy(() => CurrencyUncheckedUpdateManyWithoutCountriesNestedInputSchema).optional()
}).strict();

export const CountryCreateManyInputSchema: z.ZodType<Prisma.CountryCreateManyInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string()
}).strict();

export const CountryUpdateManyMutationInputSchema: z.ZodType<Prisma.CountryUpdateManyMutationInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const AccountNullableRelationFilterSchema: z.ZodType<Prisma.AccountNullableRelationFilter> = z.object({
  is: z.lazy(() => AccountWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => AccountWhereInputSchema).optional().nullable()
}).strict();

export const ExpenseListRelationFilterSchema: z.ZodType<Prisma.ExpenseListRelationFilter> = z.object({
  every: z.lazy(() => ExpenseWhereInputSchema).optional(),
  some: z.lazy(() => ExpenseWhereInputSchema).optional(),
  none: z.lazy(() => ExpenseWhereInputSchema).optional()
}).strict();

export const UserExpenseCategoryListRelationFilterSchema: z.ZodType<Prisma.UserExpenseCategoryListRelationFilter> = z.object({
  every: z.lazy(() => UserExpenseCategoryWhereInputSchema).optional(),
  some: z.lazy(() => UserExpenseCategoryWhereInputSchema).optional(),
  none: z.lazy(() => UserExpenseCategoryWhereInputSchema).optional()
}).strict();

export const RecurringExpenseListRelationFilterSchema: z.ZodType<Prisma.RecurringExpenseListRelationFilter> = z.object({
  every: z.lazy(() => RecurringExpenseWhereInputSchema).optional(),
  some: z.lazy(() => RecurringExpenseWhereInputSchema).optional(),
  none: z.lazy(() => RecurringExpenseWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const ExpenseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExpenseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserExpenseCategoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserExpenseCategoryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecurringExpenseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RecurringExpenseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  surname: z.lazy(() => SortOrderSchema).optional(),
  profilePicture: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  alternativeEmail: z.lazy(() => SortOrderSchema).optional(),
  currencyPreference: z.lazy(() => SortOrderSchema).optional(),
  languagePreference: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  twoFactorSecret: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  surname: z.lazy(() => SortOrderSchema).optional(),
  profilePicture: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  alternativeEmail: z.lazy(() => SortOrderSchema).optional(),
  currencyPreference: z.lazy(() => SortOrderSchema).optional(),
  languagePreference: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  twoFactorSecret: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  surname: z.lazy(() => SortOrderSchema).optional(),
  profilePicture: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  alternativeEmail: z.lazy(() => SortOrderSchema).optional(),
  currencyPreference: z.lazy(() => SortOrderSchema).optional(),
  languagePreference: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  twoFactorSecret: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountIdUserIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountIdUserIdCompoundUniqueInput> = z.object({
  id: z.string(),
  userId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  savings: z.lazy(() => SortOrderSchema).optional(),
  emergencySavings: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  balance: z.lazy(() => SortOrderSchema).optional(),
  savings: z.lazy(() => SortOrderSchema).optional(),
  emergencySavings: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  savings: z.lazy(() => SortOrderSchema).optional(),
  emergencySavings: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  balance: z.lazy(() => SortOrderSchema).optional(),
  savings: z.lazy(() => SortOrderSchema).optional(),
  emergencySavings: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  balance: z.lazy(() => SortOrderSchema).optional(),
  savings: z.lazy(() => SortOrderSchema).optional(),
  emergencySavings: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ExpenseCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseCategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  essential: z.lazy(() => SortOrderSchema).optional(),
  budgetCap: z.lazy(() => SortOrderSchema).optional(),
  colorCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseCategoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseCategoryAvgOrderByAggregateInput> = z.object({
  budgetCap: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseCategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  essential: z.lazy(() => SortOrderSchema).optional(),
  budgetCap: z.lazy(() => SortOrderSchema).optional(),
  colorCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseCategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  essential: z.lazy(() => SortOrderSchema).optional(),
  budgetCap: z.lazy(() => SortOrderSchema).optional(),
  colorCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseCategorySumOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseCategorySumOrderByAggregateInput> = z.object({
  budgetCap: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const ExpenseCategoryRelationFilterSchema: z.ZodType<Prisma.ExpenseCategoryRelationFilter> = z.object({
  is: z.lazy(() => ExpenseCategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => ExpenseCategoryWhereInputSchema).optional()
}).strict();

export const UserExpenseCategoryUserIdExpenseCategoryIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserExpenseCategoryUserIdExpenseCategoryIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  expenseCategoryId: z.string()
}).strict();

export const UserExpenseCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserExpenseCategoryCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  expenseCategoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserExpenseCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserExpenseCategoryMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  expenseCategoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserExpenseCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserExpenseCategoryMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  expenseCategoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExpenseSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const RecurringExpenseCountOrderByAggregateInputSchema: z.ZodType<Prisma.RecurringExpenseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  recurrenceDay: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecurringExpenseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecurringExpenseAvgOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  recurrenceDay: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecurringExpenseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RecurringExpenseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  recurrenceDay: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecurringExpenseMinOrderByAggregateInputSchema: z.ZodType<Prisma.RecurringExpenseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  amount: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  recurrenceDay: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RecurringExpenseSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecurringExpenseSumOrderByAggregateInput> = z.object({
  amount: z.lazy(() => SortOrderSchema).optional(),
  recurrenceDay: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const CountryListRelationFilterSchema: z.ZodType<Prisma.CountryListRelationFilter> = z.object({
  every: z.lazy(() => CountryWhereInputSchema).optional(),
  some: z.lazy(() => CountryWhereInputSchema).optional(),
  none: z.lazy(() => CountryWhereInputSchema).optional()
}).strict();

export const CountryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CountryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  symbol: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencySumOrderByAggregateInputSchema: z.ZodType<Prisma.CurrencySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CurrencyListRelationFilterSchema: z.ZodType<Prisma.CurrencyListRelationFilter> = z.object({
  every: z.lazy(() => CurrencyWhereInputSchema).optional(),
  some: z.lazy(() => CurrencyWhereInputSchema).optional(),
  none: z.lazy(() => CurrencyWhereInputSchema).optional()
}).strict();

export const CurrencyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CurrencyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryCodeNameCompoundUniqueInputSchema: z.ZodType<Prisma.CountryCodeNameCompoundUniqueInput> = z.object({
  code: z.string(),
  name: z.string()
}).strict();

export const CountryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CountryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CountryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CountryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CountrySumOrderByAggregateInputSchema: z.ZodType<Prisma.CountrySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const ExpenseCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExpenseCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserExpenseCategoryCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema).array(),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserExpenseCategoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecurringExpenseCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecurringExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecurringExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecurringExpenseCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional()
}).strict();

export const ExpenseUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserExpenseCategoryUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema).array(),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserExpenseCategoryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecurringExpenseUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecurringExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecurringExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecurringExpenseCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const AccountUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ExpenseUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExpenseUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserExpenseCategoryUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema).array(),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserExpenseCategoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserExpenseCategoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserExpenseCategoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserExpenseCategoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserExpenseCategoryScalarWhereInputSchema),z.lazy(() => UserExpenseCategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecurringExpenseUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecurringExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecurringExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecurringExpenseUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecurringExpenseUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecurringExpenseCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecurringExpenseUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecurringExpenseUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecurringExpenseUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RecurringExpenseUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecurringExpenseScalarWhereInputSchema),z.lazy(() => RecurringExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => AccountUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => AccountWhereInputSchema) ]).optional(),
  connect: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => AccountUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ExpenseUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserExpenseCategoryUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema).array(),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserExpenseCategoryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserExpenseCategoryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserExpenseCategoryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserExpenseCategoryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserExpenseCategoryScalarWhereInputSchema),z.lazy(() => UserExpenseCategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecurringExpenseUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecurringExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecurringExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecurringExpenseUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecurringExpenseUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecurringExpenseCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecurringExpenseUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecurringExpenseUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecurringExpenseUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RecurringExpenseUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecurringExpenseScalarWhereInputSchema),z.lazy(() => RecurringExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountInputSchema),z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]).optional(),
}).strict();

export const ExpenseCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseCreateWithoutCategoryInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserExpenseCategoryCreateNestedManyWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateNestedManyWithoutExpenseCategoryInput> = z.object({
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema).array(),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserExpenseCategoryCreateManyExpenseCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecurringExpenseCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema).array(),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecurringExpenseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecurringExpenseCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExpenseUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseCreateWithoutCategoryInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserExpenseCategoryUncheckedCreateNestedManyWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedCreateNestedManyWithoutExpenseCategoryInput> = z.object({
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema).array(),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserExpenseCategoryCreateManyExpenseCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RecurringExpenseUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema).array(),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecurringExpenseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecurringExpenseCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ExpenseUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ExpenseUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseCreateWithoutCategoryInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExpenseUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => ExpenseUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserExpenseCategoryUpdateManyWithoutExpenseCategoryNestedInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateManyWithoutExpenseCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema).array(),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserExpenseCategoryUpsertWithWhereUniqueWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUpsertWithWhereUniqueWithoutExpenseCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserExpenseCategoryCreateManyExpenseCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserExpenseCategoryUpdateWithWhereUniqueWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUpdateWithWhereUniqueWithoutExpenseCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserExpenseCategoryUpdateManyWithWhereWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUpdateManyWithWhereWithoutExpenseCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserExpenseCategoryScalarWhereInputSchema),z.lazy(() => UserExpenseCategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecurringExpenseUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema).array(),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecurringExpenseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecurringExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecurringExpenseCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecurringExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecurringExpenseUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecurringExpenseScalarWhereInputSchema),z.lazy(() => RecurringExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExpenseUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseCreateWithoutCategoryInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExpenseUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => ExpenseUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserExpenseCategoryUncheckedUpdateManyWithoutExpenseCategoryNestedInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedUpdateManyWithoutExpenseCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema).array(),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserExpenseCategoryUpsertWithWhereUniqueWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUpsertWithWhereUniqueWithoutExpenseCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserExpenseCategoryCreateManyExpenseCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserExpenseCategoryUpdateWithWhereUniqueWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUpdateWithWhereUniqueWithoutExpenseCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserExpenseCategoryUpdateManyWithWhereWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUpdateManyWithWhereWithoutExpenseCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserExpenseCategoryScalarWhereInputSchema),z.lazy(() => UserExpenseCategoryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RecurringExpenseUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema).array(),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecurringExpenseCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecurringExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecurringExpenseCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecurringExpenseWhereUniqueInputSchema),z.lazy(() => RecurringExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecurringExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecurringExpenseUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecurringExpenseScalarWhereInputSchema),z.lazy(() => RecurringExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUserExpenseCategoryInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserExpenseCategoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserExpenseCategoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserExpenseCategoryInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ExpenseCategoryCreateNestedOneWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateNestedOneWithoutUserExpenseCategoryInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutUserExpenseCategoryInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutUserExpenseCategoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExpenseCategoryCreateOrConnectWithoutUserExpenseCategoryInputSchema).optional(),
  connect: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUserExpenseCategoryNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUserExpenseCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUserExpenseCategoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserExpenseCategoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUserExpenseCategoryInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUserExpenseCategoryInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUserExpenseCategoryInputSchema),z.lazy(() => UserUpdateWithoutUserExpenseCategoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserExpenseCategoryInputSchema) ]).optional(),
}).strict();

export const ExpenseCategoryUpdateOneRequiredWithoutUserExpenseCategoryNestedInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateOneRequiredWithoutUserExpenseCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutUserExpenseCategoryInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutUserExpenseCategoryInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExpenseCategoryCreateOrConnectWithoutUserExpenseCategoryInputSchema).optional(),
  upsert: z.lazy(() => ExpenseCategoryUpsertWithoutUserExpenseCategoryInputSchema).optional(),
  connect: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExpenseCategoryUpdateToOneWithWhereWithoutUserExpenseCategoryInputSchema),z.lazy(() => ExpenseCategoryUpdateWithoutUserExpenseCategoryInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutUserExpenseCategoryInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutExpensesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutExpensesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExpensesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExpensesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ExpenseCategoryCreateNestedOneWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateNestedOneWithoutExpensesInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutExpensesInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutExpensesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExpenseCategoryCreateOrConnectWithoutExpensesInputSchema).optional(),
  connect: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutExpensesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutExpensesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExpensesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExpensesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutExpensesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutExpensesInputSchema),z.lazy(() => UserUpdateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExpensesInputSchema) ]).optional(),
}).strict();

export const ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutExpensesInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutExpensesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExpenseCategoryCreateOrConnectWithoutExpensesInputSchema).optional(),
  upsert: z.lazy(() => ExpenseCategoryUpsertWithoutExpensesInputSchema).optional(),
  connect: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExpenseCategoryUpdateToOneWithWhereWithoutExpensesInputSchema),z.lazy(() => ExpenseCategoryUpdateWithoutExpensesInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutExpensesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRecurringExpenseInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRecurringExpenseInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecurringExpenseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRecurringExpenseInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ExpenseCategoryCreateNestedOneWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateNestedOneWithoutRecurringExpenseInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutRecurringExpenseInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutRecurringExpenseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExpenseCategoryCreateOrConnectWithoutRecurringExpenseInputSchema).optional(),
  connect: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutRecurringExpenseNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutRecurringExpenseNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutRecurringExpenseInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecurringExpenseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRecurringExpenseInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRecurringExpenseInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRecurringExpenseInputSchema),z.lazy(() => UserUpdateWithoutRecurringExpenseInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecurringExpenseInputSchema) ]).optional(),
}).strict();

export const ExpenseCategoryUpdateOneRequiredWithoutRecurringExpenseNestedInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateOneRequiredWithoutRecurringExpenseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutRecurringExpenseInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutRecurringExpenseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ExpenseCategoryCreateOrConnectWithoutRecurringExpenseInputSchema).optional(),
  upsert: z.lazy(() => ExpenseCategoryUpsertWithoutRecurringExpenseInputSchema).optional(),
  connect: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ExpenseCategoryUpdateToOneWithWhereWithoutRecurringExpenseInputSchema),z.lazy(() => ExpenseCategoryUpdateWithoutRecurringExpenseInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutRecurringExpenseInputSchema) ]).optional(),
}).strict();

export const CountryCreateNestedManyWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryCreateNestedManyWithoutCurrenciesInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryCreateWithoutCurrenciesInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutCurrenciesInputSchema),z.lazy(() => CountryCreateOrConnectWithoutCurrenciesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedCreateNestedManyWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryUncheckedCreateNestedManyWithoutCurrenciesInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryCreateWithoutCurrenciesInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutCurrenciesInputSchema),z.lazy(() => CountryCreateOrConnectWithoutCurrenciesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CountryUpdateManyWithoutCurrenciesNestedInputSchema: z.ZodType<Prisma.CountryUpdateManyWithoutCurrenciesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryCreateWithoutCurrenciesInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutCurrenciesInputSchema),z.lazy(() => CountryCreateOrConnectWithoutCurrenciesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutCurrenciesInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutCurrenciesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutCurrenciesInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutCurrenciesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutCurrenciesInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutCurrenciesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyWithoutCurrenciesNestedInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutCurrenciesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryCreateWithoutCurrenciesInputSchema).array(),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CountryCreateOrConnectWithoutCurrenciesInputSchema),z.lazy(() => CountryCreateOrConnectWithoutCurrenciesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CountryUpsertWithWhereUniqueWithoutCurrenciesInputSchema),z.lazy(() => CountryUpsertWithWhereUniqueWithoutCurrenciesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CountryWhereUniqueInputSchema),z.lazy(() => CountryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CountryUpdateWithWhereUniqueWithoutCurrenciesInputSchema),z.lazy(() => CountryUpdateWithWhereUniqueWithoutCurrenciesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CountryUpdateManyWithWhereWithoutCurrenciesInputSchema),z.lazy(() => CountryUpdateManyWithWhereWithoutCurrenciesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CurrencyCreateNestedManyWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyCreateNestedManyWithoutCountriesInput> = z.object({
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyCreateWithoutCountriesInputSchema).array(),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema),z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CurrencyUncheckedCreateNestedManyWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUncheckedCreateNestedManyWithoutCountriesInput> = z.object({
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyCreateWithoutCountriesInputSchema).array(),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema),z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CurrencyUpdateManyWithoutCountriesNestedInputSchema: z.ZodType<Prisma.CurrencyUpdateManyWithoutCountriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyCreateWithoutCountriesInputSchema).array(),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema),z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CurrencyUpsertWithWhereUniqueWithoutCountriesInputSchema),z.lazy(() => CurrencyUpsertWithWhereUniqueWithoutCountriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CurrencyUpdateWithWhereUniqueWithoutCountriesInputSchema),z.lazy(() => CurrencyUpdateWithWhereUniqueWithoutCountriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CurrencyUpdateManyWithWhereWithoutCountriesInputSchema),z.lazy(() => CurrencyUpdateManyWithWhereWithoutCountriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CurrencyScalarWhereInputSchema),z.lazy(() => CurrencyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CurrencyUncheckedUpdateManyWithoutCountriesNestedInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateManyWithoutCountriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyCreateWithoutCountriesInputSchema).array(),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema),z.lazy(() => CurrencyCreateOrConnectWithoutCountriesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CurrencyUpsertWithWhereUniqueWithoutCountriesInputSchema),z.lazy(() => CurrencyUpsertWithWhereUniqueWithoutCountriesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CurrencyWhereUniqueInputSchema),z.lazy(() => CurrencyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CurrencyUpdateWithWhereUniqueWithoutCountriesInputSchema),z.lazy(() => CurrencyUpdateWithWhereUniqueWithoutCountriesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CurrencyUpdateManyWithWhereWithoutCountriesInputSchema),z.lazy(() => CurrencyUpdateManyWithWhereWithoutCountriesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CurrencyScalarWhereInputSchema),z.lazy(() => CurrencyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  balance: z.number(),
  savings: z.number(),
  emergencySavings: z.number()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  balance: z.number(),
  savings: z.number(),
  emergencySavings: z.number()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExpenseCreateWithoutUserInputSchema: z.ZodType<Prisma.ExpenseCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  category: z.lazy(() => ExpenseCategoryCreateNestedOneWithoutExpensesInputSchema)
}).strict();

export const ExpenseUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ExpenseCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ExpenseCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExpenseCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ExpenseCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExpenseCreateManyUserInputSchema),z.lazy(() => ExpenseCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserExpenseCategoryCreateWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateWithoutUserInput> = z.object({
  expenseCategory: z.lazy(() => ExpenseCategoryCreateNestedOneWithoutUserExpenseCategoryInputSchema)
}).strict();

export const UserExpenseCategoryUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedCreateWithoutUserInput> = z.object({
  expenseCategoryId: z.string()
}).strict();

export const UserExpenseCategoryCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserExpenseCategoryCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserExpenseCategoryCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserExpenseCategoryCreateManyUserInputSchema),z.lazy(() => UserExpenseCategoryCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RecurringExpenseCreateWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => ExpenseCategoryCreateNestedOneWithoutRecurringExpenseInputSchema)
}).strict();

export const RecurringExpenseUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RecurringExpenseCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RecurringExpenseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RecurringExpenseCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RecurringExpenseCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecurringExpenseCreateManyUserInputSchema),z.lazy(() => RecurringExpenseCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const AccountUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  savings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  emergencySavings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  balance: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  savings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  emergencySavings: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExpenseUpdateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExpenseUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExpenseUpdateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ExpenseUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExpenseUpdateManyMutationInputSchema),z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ExpenseScalarWhereInputSchema: z.ZodType<Prisma.ExpenseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserExpenseCategoryUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserExpenseCategoryUpdateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserExpenseCategoryUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserExpenseCategoryUpdateWithoutUserInputSchema),z.lazy(() => UserExpenseCategoryUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserExpenseCategoryUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserExpenseCategoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserExpenseCategoryUpdateManyMutationInputSchema),z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserExpenseCategoryScalarWhereInputSchema: z.ZodType<Prisma.UserExpenseCategoryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserExpenseCategoryScalarWhereInputSchema),z.lazy(() => UserExpenseCategoryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserExpenseCategoryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserExpenseCategoryScalarWhereInputSchema),z.lazy(() => UserExpenseCategoryScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expenseCategoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const RecurringExpenseUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RecurringExpenseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecurringExpenseUpdateWithoutUserInputSchema),z.lazy(() => RecurringExpenseUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutUserInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const RecurringExpenseUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RecurringExpenseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecurringExpenseUpdateWithoutUserInputSchema),z.lazy(() => RecurringExpenseUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const RecurringExpenseUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RecurringExpenseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecurringExpenseUpdateManyMutationInputSchema),z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const RecurringExpenseScalarWhereInputSchema: z.ZodType<Prisma.RecurringExpenseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecurringExpenseScalarWhereInputSchema),z.lazy(() => RecurringExpenseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecurringExpenseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecurringExpenseScalarWhereInputSchema),z.lazy(() => RecurringExpenseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  amount: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  recurrenceDay: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutUserInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryCreateNestedManyWithoutUserInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUpdateManyWithoutUserNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ExpenseCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutExpensesInputSchema)
}).strict();

export const ExpenseUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const ExpenseCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExpenseCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const ExpenseCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.ExpenseCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExpenseCreateManyCategoryInputSchema),z.lazy(() => ExpenseCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateWithoutExpenseCategoryInput> = z.object({
  user: z.lazy(() => UserCreateNestedOneWithoutUserExpenseCategoryInputSchema)
}).strict();

export const UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInput> = z.object({
  userId: z.string()
}).strict();

export const UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateOrConnectWithoutExpenseCategoryInput> = z.object({
  where: z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema) ]),
}).strict();

export const UserExpenseCategoryCreateManyExpenseCategoryInputEnvelopeSchema: z.ZodType<Prisma.UserExpenseCategoryCreateManyExpenseCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserExpenseCategoryCreateManyExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryCreateManyExpenseCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RecurringExpenseCreateWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRecurringExpenseInputSchema)
}).strict();

export const RecurringExpenseUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RecurringExpenseCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => RecurringExpenseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const RecurringExpenseCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.RecurringExpenseCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecurringExpenseCreateManyCategoryInputSchema),z.lazy(() => RecurringExpenseCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExpenseUpdateWithoutCategoryInputSchema),z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => ExpenseCreateWithoutCategoryInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const ExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExpenseUpdateWithoutCategoryInputSchema),z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const ExpenseUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => ExpenseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExpenseUpdateManyMutationInputSchema),z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const UserExpenseCategoryUpsertWithWhereUniqueWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpsertWithWhereUniqueWithoutExpenseCategoryInput> = z.object({
  where: z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserExpenseCategoryUpdateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUncheckedUpdateWithoutExpenseCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => UserExpenseCategoryCreateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUncheckedCreateWithoutExpenseCategoryInputSchema) ]),
}).strict();

export const UserExpenseCategoryUpdateWithWhereUniqueWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateWithWhereUniqueWithoutExpenseCategoryInput> = z.object({
  where: z.lazy(() => UserExpenseCategoryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserExpenseCategoryUpdateWithoutExpenseCategoryInputSchema),z.lazy(() => UserExpenseCategoryUncheckedUpdateWithoutExpenseCategoryInputSchema) ]),
}).strict();

export const UserExpenseCategoryUpdateManyWithWhereWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateManyWithWhereWithoutExpenseCategoryInput> = z.object({
  where: z.lazy(() => UserExpenseCategoryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserExpenseCategoryUpdateManyMutationInputSchema),z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutExpenseCategoryInputSchema) ]),
}).strict();

export const RecurringExpenseUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => RecurringExpenseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecurringExpenseUpdateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => RecurringExpenseCreateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const RecurringExpenseUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => RecurringExpenseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecurringExpenseUpdateWithoutCategoryInputSchema),z.lazy(() => RecurringExpenseUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const RecurringExpenseUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => RecurringExpenseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecurringExpenseUpdateManyMutationInputSchema),z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const UserCreateWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.UserCreateWithoutUserExpenseCategoryInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  account: z.lazy(() => AccountCreateNestedOneWithoutUserInputSchema).optional(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutUserInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUserExpenseCategoryInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  account: z.lazy(() => AccountUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUserExpenseCategoryInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUserExpenseCategoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserExpenseCategoryInputSchema) ]),
}).strict();

export const ExpenseCategoryCreateWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateWithoutUserExpenseCategoryInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const ExpenseCategoryUncheckedCreateWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedCreateWithoutUserExpenseCategoryInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const ExpenseCategoryCreateOrConnectWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateOrConnectWithoutUserExpenseCategoryInput> = z.object({
  where: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutUserExpenseCategoryInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutUserExpenseCategoryInputSchema) ]),
}).strict();

export const UserUpsertWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.UserUpsertWithoutUserExpenseCategoryInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUserExpenseCategoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserExpenseCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUserExpenseCategoryInputSchema),z.lazy(() => UserUncheckedCreateWithoutUserExpenseCategoryInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUserExpenseCategoryInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUserExpenseCategoryInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUserExpenseCategoryInputSchema) ]),
}).strict();

export const UserUpdateWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.UserUpdateWithoutUserExpenseCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  account: z.lazy(() => AccountUpdateOneWithoutUserNestedInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUserExpenseCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  account: z.lazy(() => AccountUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ExpenseCategoryUpsertWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.ExpenseCategoryUpsertWithoutUserExpenseCategoryInput> = z.object({
  update: z.union([ z.lazy(() => ExpenseCategoryUpdateWithoutUserExpenseCategoryInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutUserExpenseCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutUserExpenseCategoryInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutUserExpenseCategoryInputSchema) ]),
  where: z.lazy(() => ExpenseCategoryWhereInputSchema).optional()
}).strict();

export const ExpenseCategoryUpdateToOneWithWhereWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateToOneWithWhereWithoutUserExpenseCategoryInput> = z.object({
  where: z.lazy(() => ExpenseCategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExpenseCategoryUpdateWithoutUserExpenseCategoryInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutUserExpenseCategoryInputSchema) ]),
}).strict();

export const ExpenseCategoryUpdateWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateWithoutUserExpenseCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutCategoryNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const ExpenseCategoryUncheckedUpdateWithoutUserExpenseCategoryInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedUpdateWithoutUserExpenseCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutExpensesInputSchema: z.ZodType<Prisma.UserCreateWithoutExpensesInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  account: z.lazy(() => AccountCreateNestedOneWithoutUserInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryCreateNestedManyWithoutUserInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutExpensesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutExpensesInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  account: z.lazy(() => AccountUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutExpensesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutExpensesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExpensesInputSchema) ]),
}).strict();

export const ExpenseCategoryCreateWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateWithoutExpensesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryCreateNestedManyWithoutExpenseCategoryInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const ExpenseCategoryUncheckedCreateWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedCreateWithoutExpensesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedCreateNestedManyWithoutExpenseCategoryInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const ExpenseCategoryCreateOrConnectWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateOrConnectWithoutExpensesInput> = z.object({
  where: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutExpensesInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutExpensesInputSchema) ]),
}).strict();

export const UserUpsertWithoutExpensesInputSchema: z.ZodType<Prisma.UserUpsertWithoutExpensesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExpensesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExpensesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutExpensesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutExpensesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExpensesInputSchema) ]),
}).strict();

export const UserUpdateWithoutExpensesInputSchema: z.ZodType<Prisma.UserUpdateWithoutExpensesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  account: z.lazy(() => AccountUpdateOneWithoutUserNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUpdateManyWithoutUserNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutExpensesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutExpensesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  account: z.lazy(() => AccountUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ExpenseCategoryUpsertWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseCategoryUpsertWithoutExpensesInput> = z.object({
  update: z.union([ z.lazy(() => ExpenseCategoryUpdateWithoutExpensesInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutExpensesInputSchema) ]),
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutExpensesInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutExpensesInputSchema) ]),
  where: z.lazy(() => ExpenseCategoryWhereInputSchema).optional()
}).strict();

export const ExpenseCategoryUpdateToOneWithWhereWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateToOneWithWhereWithoutExpensesInput> = z.object({
  where: z.lazy(() => ExpenseCategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExpenseCategoryUpdateWithoutExpensesInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutExpensesInputSchema) ]),
}).strict();

export const ExpenseCategoryUpdateWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateWithoutExpensesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUpdateManyWithoutExpenseCategoryNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const ExpenseCategoryUncheckedUpdateWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedUpdateWithoutExpensesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutExpenseCategoryNestedInputSchema).optional(),
  RecurringExpense: z.lazy(() => RecurringExpenseUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.UserCreateWithoutRecurringExpenseInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  account: z.lazy(() => AccountCreateNestedOneWithoutUserInputSchema).optional(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutUserInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRecurringExpenseInput> = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
  profilePicture: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  country: z.string().optional().nullable(),
  alternativeEmail: z.string().optional().nullable(),
  currencyPreference: z.string().optional().nullable(),
  languagePreference: z.string().optional().nullable(),
  twoFactorEnabled: z.boolean().optional(),
  twoFactorSecret: z.string().optional().nullable(),
  account: z.lazy(() => AccountUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRecurringExpenseInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRecurringExpenseInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecurringExpenseInputSchema) ]),
}).strict();

export const ExpenseCategoryCreateWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateWithoutRecurringExpenseInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryCreateNestedManyWithoutExpenseCategoryInputSchema).optional()
}).strict();

export const ExpenseCategoryUncheckedCreateWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedCreateWithoutRecurringExpenseInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  essential: z.boolean().optional(),
  budgetCap: z.number().optional().nullable(),
  colorCode: z.string().optional().nullable(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedCreateNestedManyWithoutExpenseCategoryInputSchema).optional()
}).strict();

export const ExpenseCategoryCreateOrConnectWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.ExpenseCategoryCreateOrConnectWithoutRecurringExpenseInput> = z.object({
  where: z.lazy(() => ExpenseCategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutRecurringExpenseInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutRecurringExpenseInputSchema) ]),
}).strict();

export const UserUpsertWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.UserUpsertWithoutRecurringExpenseInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutRecurringExpenseInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecurringExpenseInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRecurringExpenseInputSchema),z.lazy(() => UserUncheckedCreateWithoutRecurringExpenseInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRecurringExpenseInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRecurringExpenseInputSchema),z.lazy(() => UserUncheckedUpdateWithoutRecurringExpenseInputSchema) ]),
}).strict();

export const UserUpdateWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.UserUpdateWithoutRecurringExpenseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  account: z.lazy(() => AccountUpdateOneWithoutUserNestedInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRecurringExpenseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  surname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profilePicture: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  alternativeEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  currencyPreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languagePreference: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorSecret: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  account: z.lazy(() => AccountUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const ExpenseCategoryUpsertWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.ExpenseCategoryUpsertWithoutRecurringExpenseInput> = z.object({
  update: z.union([ z.lazy(() => ExpenseCategoryUpdateWithoutRecurringExpenseInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutRecurringExpenseInputSchema) ]),
  create: z.union([ z.lazy(() => ExpenseCategoryCreateWithoutRecurringExpenseInputSchema),z.lazy(() => ExpenseCategoryUncheckedCreateWithoutRecurringExpenseInputSchema) ]),
  where: z.lazy(() => ExpenseCategoryWhereInputSchema).optional()
}).strict();

export const ExpenseCategoryUpdateToOneWithWhereWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateToOneWithWhereWithoutRecurringExpenseInput> = z.object({
  where: z.lazy(() => ExpenseCategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ExpenseCategoryUpdateWithoutRecurringExpenseInputSchema),z.lazy(() => ExpenseCategoryUncheckedUpdateWithoutRecurringExpenseInputSchema) ]),
}).strict();

export const ExpenseCategoryUpdateWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.ExpenseCategoryUpdateWithoutRecurringExpenseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutCategoryNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUpdateManyWithoutExpenseCategoryNestedInputSchema).optional()
}).strict();

export const ExpenseCategoryUncheckedUpdateWithoutRecurringExpenseInputSchema: z.ZodType<Prisma.ExpenseCategoryUncheckedUpdateWithoutRecurringExpenseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  essential: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  budgetCap: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  colorCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
  UserExpenseCategory: z.lazy(() => UserExpenseCategoryUncheckedUpdateManyWithoutExpenseCategoryNestedInputSchema).optional()
}).strict();

export const CountryCreateWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryCreateWithoutCurrenciesInput> = z.object({
  code: z.string(),
  name: z.string()
}).strict();

export const CountryUncheckedCreateWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryUncheckedCreateWithoutCurrenciesInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string()
}).strict();

export const CountryCreateOrConnectWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryCreateOrConnectWithoutCurrenciesInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema) ]),
}).strict();

export const CountryUpsertWithWhereUniqueWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryUpsertWithWhereUniqueWithoutCurrenciesInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CountryUpdateWithoutCurrenciesInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutCurrenciesInputSchema) ]),
  create: z.union([ z.lazy(() => CountryCreateWithoutCurrenciesInputSchema),z.lazy(() => CountryUncheckedCreateWithoutCurrenciesInputSchema) ]),
}).strict();

export const CountryUpdateWithWhereUniqueWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryUpdateWithWhereUniqueWithoutCurrenciesInput> = z.object({
  where: z.lazy(() => CountryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateWithoutCurrenciesInputSchema),z.lazy(() => CountryUncheckedUpdateWithoutCurrenciesInputSchema) ]),
}).strict();

export const CountryUpdateManyWithWhereWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryUpdateManyWithWhereWithoutCurrenciesInput> = z.object({
  where: z.lazy(() => CountryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CountryUpdateManyMutationInputSchema),z.lazy(() => CountryUncheckedUpdateManyWithoutCurrenciesInputSchema) ]),
}).strict();

export const CountryScalarWhereInputSchema: z.ZodType<Prisma.CountryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CountryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CountryScalarWhereInputSchema),z.lazy(() => CountryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CurrencyCreateWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyCreateWithoutCountriesInput> = z.object({
  code: z.string(),
  name: z.string(),
  symbol: z.string().optional().nullable(),
  active: z.boolean().optional()
}).strict();

export const CurrencyUncheckedCreateWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUncheckedCreateWithoutCountriesInput> = z.object({
  id: z.number().int().optional(),
  code: z.string(),
  name: z.string(),
  symbol: z.string().optional().nullable(),
  active: z.boolean().optional()
}).strict();

export const CurrencyCreateOrConnectWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyCreateOrConnectWithoutCountriesInput> = z.object({
  where: z.lazy(() => CurrencyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema) ]),
}).strict();

export const CurrencyUpsertWithWhereUniqueWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUpsertWithWhereUniqueWithoutCountriesInput> = z.object({
  where: z.lazy(() => CurrencyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CurrencyUpdateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedUpdateWithoutCountriesInputSchema) ]),
  create: z.union([ z.lazy(() => CurrencyCreateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedCreateWithoutCountriesInputSchema) ]),
}).strict();

export const CurrencyUpdateWithWhereUniqueWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUpdateWithWhereUniqueWithoutCountriesInput> = z.object({
  where: z.lazy(() => CurrencyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CurrencyUpdateWithoutCountriesInputSchema),z.lazy(() => CurrencyUncheckedUpdateWithoutCountriesInputSchema) ]),
}).strict();

export const CurrencyUpdateManyWithWhereWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUpdateManyWithWhereWithoutCountriesInput> = z.object({
  where: z.lazy(() => CurrencyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CurrencyUpdateManyMutationInputSchema),z.lazy(() => CurrencyUncheckedUpdateManyWithoutCountriesInputSchema) ]),
}).strict();

export const CurrencyScalarWhereInputSchema: z.ZodType<Prisma.CurrencyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CurrencyScalarWhereInputSchema),z.lazy(() => CurrencyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CurrencyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CurrencyScalarWhereInputSchema),z.lazy(() => CurrencyScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  code: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  symbol: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const ExpenseCreateManyUserInputSchema: z.ZodType<Prisma.ExpenseCreateManyUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserExpenseCategoryCreateManyUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateManyUserInput> = z.object({
  expenseCategoryId: z.string()
}).strict();

export const RecurringExpenseCreateManyUserInputSchema: z.ZodType<Prisma.RecurringExpenseCreateManyUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string(),
  categoryId: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ExpenseUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => ExpenseCategoryUpdateOneRequiredWithoutExpensesNestedInputSchema).optional()
}).strict();

export const ExpenseUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserExpenseCategoryUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateWithoutUserInput> = z.object({
  expenseCategory: z.lazy(() => ExpenseCategoryUpdateOneRequiredWithoutUserExpenseCategoryNestedInputSchema).optional()
}).strict();

export const UserExpenseCategoryUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedUpdateWithoutUserInput> = z.object({
  expenseCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserExpenseCategoryUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedUpdateManyWithoutUserInput> = z.object({
  expenseCategoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecurringExpenseUpdateWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => ExpenseCategoryUpdateOneRequiredWithoutRecurringExpenseNestedInputSchema).optional()
}).strict();

export const RecurringExpenseUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecurringExpenseUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseCreateManyCategoryInputSchema: z.ZodType<Prisma.ExpenseCreateManyCategoryInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();

export const UserExpenseCategoryCreateManyExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryCreateManyExpenseCategoryInput> = z.object({
  userId: z.string()
}).strict();

export const RecurringExpenseCreateManyCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseCreateManyCategoryInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  description: z.string(),
  recurrenceDay: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ExpenseUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExpensesNestedInputSchema).optional()
}).strict();

export const ExpenseUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserExpenseCategoryUpdateWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateWithoutExpenseCategoryInput> = z.object({
  user: z.lazy(() => UserUpdateOneRequiredWithoutUserExpenseCategoryNestedInputSchema).optional()
}).strict();

export const UserExpenseCategoryUncheckedUpdateWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedUpdateWithoutExpenseCategoryInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserExpenseCategoryUncheckedUpdateManyWithoutExpenseCategoryInputSchema: z.ZodType<Prisma.UserExpenseCategoryUncheckedUpdateManyWithoutExpenseCategoryInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecurringExpenseUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRecurringExpenseNestedInputSchema).optional()
}).strict();

export const RecurringExpenseUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RecurringExpenseUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.RecurringExpenseUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  amount: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  recurrenceDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUpdateWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryUpdateWithoutCurrenciesInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUncheckedUpdateWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateWithoutCurrenciesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CountryUncheckedUpdateManyWithoutCurrenciesInputSchema: z.ZodType<Prisma.CountryUncheckedUpdateManyWithoutCurrenciesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CurrencyUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUpdateWithoutCountriesInput> = z.object({
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CurrencyUncheckedUpdateWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateWithoutCountriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CurrencyUncheckedUpdateManyWithoutCountriesInputSchema: z.ZodType<Prisma.CurrencyUncheckedUpdateManyWithoutCountriesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  symbol: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const ExpenseCategoryFindFirstArgsSchema: z.ZodType<Prisma.ExpenseCategoryFindFirstArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  where: ExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseCategoryOrderByWithRelationInputSchema.array(),ExpenseCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExpenseCategoryScalarFieldEnumSchema,ExpenseCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExpenseCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExpenseCategoryFindFirstOrThrowArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  where: ExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseCategoryOrderByWithRelationInputSchema.array(),ExpenseCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExpenseCategoryScalarFieldEnumSchema,ExpenseCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExpenseCategoryFindManyArgsSchema: z.ZodType<Prisma.ExpenseCategoryFindManyArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  where: ExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseCategoryOrderByWithRelationInputSchema.array(),ExpenseCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExpenseCategoryScalarFieldEnumSchema,ExpenseCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExpenseCategoryAggregateArgsSchema: z.ZodType<Prisma.ExpenseCategoryAggregateArgs> = z.object({
  where: ExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseCategoryOrderByWithRelationInputSchema.array(),ExpenseCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExpenseCategoryGroupByArgsSchema: z.ZodType<Prisma.ExpenseCategoryGroupByArgs> = z.object({
  where: ExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseCategoryOrderByWithAggregationInputSchema.array(),ExpenseCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: ExpenseCategoryScalarFieldEnumSchema.array(),
  having: ExpenseCategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExpenseCategoryFindUniqueArgsSchema: z.ZodType<Prisma.ExpenseCategoryFindUniqueArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  where: ExpenseCategoryWhereUniqueInputSchema,
}).strict() ;

export const ExpenseCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExpenseCategoryFindUniqueOrThrowArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  where: ExpenseCategoryWhereUniqueInputSchema,
}).strict() ;

export const UserExpenseCategoryFindFirstArgsSchema: z.ZodType<Prisma.UserExpenseCategoryFindFirstArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  where: UserExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ UserExpenseCategoryOrderByWithRelationInputSchema.array(),UserExpenseCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: UserExpenseCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserExpenseCategoryScalarFieldEnumSchema,UserExpenseCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserExpenseCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserExpenseCategoryFindFirstOrThrowArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  where: UserExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ UserExpenseCategoryOrderByWithRelationInputSchema.array(),UserExpenseCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: UserExpenseCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserExpenseCategoryScalarFieldEnumSchema,UserExpenseCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserExpenseCategoryFindManyArgsSchema: z.ZodType<Prisma.UserExpenseCategoryFindManyArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  where: UserExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ UserExpenseCategoryOrderByWithRelationInputSchema.array(),UserExpenseCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: UserExpenseCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserExpenseCategoryScalarFieldEnumSchema,UserExpenseCategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserExpenseCategoryAggregateArgsSchema: z.ZodType<Prisma.UserExpenseCategoryAggregateArgs> = z.object({
  where: UserExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ UserExpenseCategoryOrderByWithRelationInputSchema.array(),UserExpenseCategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: UserExpenseCategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserExpenseCategoryGroupByArgsSchema: z.ZodType<Prisma.UserExpenseCategoryGroupByArgs> = z.object({
  where: UserExpenseCategoryWhereInputSchema.optional(),
  orderBy: z.union([ UserExpenseCategoryOrderByWithAggregationInputSchema.array(),UserExpenseCategoryOrderByWithAggregationInputSchema ]).optional(),
  by: UserExpenseCategoryScalarFieldEnumSchema.array(),
  having: UserExpenseCategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserExpenseCategoryFindUniqueArgsSchema: z.ZodType<Prisma.UserExpenseCategoryFindUniqueArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  where: UserExpenseCategoryWhereUniqueInputSchema,
}).strict() ;

export const UserExpenseCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserExpenseCategoryFindUniqueOrThrowArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  where: UserExpenseCategoryWhereUniqueInputSchema,
}).strict() ;

export const ExpenseFindFirstArgsSchema: z.ZodType<Prisma.ExpenseFindFirstArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithRelationInputSchema.array(),ExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExpenseScalarFieldEnumSchema,ExpenseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExpenseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExpenseFindFirstOrThrowArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithRelationInputSchema.array(),ExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExpenseScalarFieldEnumSchema,ExpenseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExpenseFindManyArgsSchema: z.ZodType<Prisma.ExpenseFindManyArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithRelationInputSchema.array(),ExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExpenseScalarFieldEnumSchema,ExpenseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExpenseAggregateArgsSchema: z.ZodType<Prisma.ExpenseAggregateArgs> = z.object({
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithRelationInputSchema.array(),ExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExpenseGroupByArgsSchema: z.ZodType<Prisma.ExpenseGroupByArgs> = z.object({
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithAggregationInputSchema.array(),ExpenseOrderByWithAggregationInputSchema ]).optional(),
  by: ExpenseScalarFieldEnumSchema.array(),
  having: ExpenseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExpenseFindUniqueArgsSchema: z.ZodType<Prisma.ExpenseFindUniqueArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereUniqueInputSchema,
}).strict() ;

export const ExpenseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExpenseFindUniqueOrThrowArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereUniqueInputSchema,
}).strict() ;

export const RecurringExpenseFindFirstArgsSchema: z.ZodType<Prisma.RecurringExpenseFindFirstArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  where: RecurringExpenseWhereInputSchema.optional(),
  orderBy: z.union([ RecurringExpenseOrderByWithRelationInputSchema.array(),RecurringExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: RecurringExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecurringExpenseScalarFieldEnumSchema,RecurringExpenseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecurringExpenseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecurringExpenseFindFirstOrThrowArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  where: RecurringExpenseWhereInputSchema.optional(),
  orderBy: z.union([ RecurringExpenseOrderByWithRelationInputSchema.array(),RecurringExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: RecurringExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecurringExpenseScalarFieldEnumSchema,RecurringExpenseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecurringExpenseFindManyArgsSchema: z.ZodType<Prisma.RecurringExpenseFindManyArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  where: RecurringExpenseWhereInputSchema.optional(),
  orderBy: z.union([ RecurringExpenseOrderByWithRelationInputSchema.array(),RecurringExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: RecurringExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecurringExpenseScalarFieldEnumSchema,RecurringExpenseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RecurringExpenseAggregateArgsSchema: z.ZodType<Prisma.RecurringExpenseAggregateArgs> = z.object({
  where: RecurringExpenseWhereInputSchema.optional(),
  orderBy: z.union([ RecurringExpenseOrderByWithRelationInputSchema.array(),RecurringExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: RecurringExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecurringExpenseGroupByArgsSchema: z.ZodType<Prisma.RecurringExpenseGroupByArgs> = z.object({
  where: RecurringExpenseWhereInputSchema.optional(),
  orderBy: z.union([ RecurringExpenseOrderByWithAggregationInputSchema.array(),RecurringExpenseOrderByWithAggregationInputSchema ]).optional(),
  by: RecurringExpenseScalarFieldEnumSchema.array(),
  having: RecurringExpenseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RecurringExpenseFindUniqueArgsSchema: z.ZodType<Prisma.RecurringExpenseFindUniqueArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  where: RecurringExpenseWhereUniqueInputSchema,
}).strict() ;

export const RecurringExpenseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RecurringExpenseFindUniqueOrThrowArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  where: RecurringExpenseWhereUniqueInputSchema,
}).strict() ;

export const CurrencyFindFirstArgsSchema: z.ZodType<Prisma.CurrencyFindFirstArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(),CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema,CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CurrencyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CurrencyFindFirstOrThrowArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(),CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema,CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CurrencyFindManyArgsSchema: z.ZodType<Prisma.CurrencyFindManyArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(),CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CurrencyScalarFieldEnumSchema,CurrencyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CurrencyAggregateArgsSchema: z.ZodType<Prisma.CurrencyAggregateArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithRelationInputSchema.array(),CurrencyOrderByWithRelationInputSchema ]).optional(),
  cursor: CurrencyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CurrencyGroupByArgsSchema: z.ZodType<Prisma.CurrencyGroupByArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(),
  orderBy: z.union([ CurrencyOrderByWithAggregationInputSchema.array(),CurrencyOrderByWithAggregationInputSchema ]).optional(),
  by: CurrencyScalarFieldEnumSchema.array(),
  having: CurrencyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CurrencyFindUniqueArgsSchema: z.ZodType<Prisma.CurrencyFindUniqueArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema,
}).strict() ;

export const CurrencyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CurrencyFindUniqueOrThrowArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema,
}).strict() ;

export const CountryFindFirstArgsSchema: z.ZodType<Prisma.CountryFindFirstArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CountryFindFirstOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryFindManyArgsSchema: z.ZodType<Prisma.CountryFindManyArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CountryScalarFieldEnumSchema,CountryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CountryAggregateArgsSchema: z.ZodType<Prisma.CountryAggregateArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithRelationInputSchema.array(),CountryOrderByWithRelationInputSchema ]).optional(),
  cursor: CountryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CountryGroupByArgsSchema: z.ZodType<Prisma.CountryGroupByArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
  orderBy: z.union([ CountryOrderByWithAggregationInputSchema.array(),CountryOrderByWithAggregationInputSchema ]).optional(),
  by: CountryScalarFieldEnumSchema.array(),
  having: CountryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CountryFindUniqueArgsSchema: z.ZodType<Prisma.CountryFindUniqueArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CountryFindUniqueOrThrowArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const ExpenseCategoryCreateArgsSchema: z.ZodType<Prisma.ExpenseCategoryCreateArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  data: z.union([ ExpenseCategoryCreateInputSchema,ExpenseCategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const ExpenseCategoryUpsertArgsSchema: z.ZodType<Prisma.ExpenseCategoryUpsertArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  where: ExpenseCategoryWhereUniqueInputSchema,
  create: z.union([ ExpenseCategoryCreateInputSchema,ExpenseCategoryUncheckedCreateInputSchema ]),
  update: z.union([ ExpenseCategoryUpdateInputSchema,ExpenseCategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const ExpenseCategoryCreateManyArgsSchema: z.ZodType<Prisma.ExpenseCategoryCreateManyArgs> = z.object({
  data: z.union([ ExpenseCategoryCreateManyInputSchema,ExpenseCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExpenseCategoryDeleteArgsSchema: z.ZodType<Prisma.ExpenseCategoryDeleteArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  where: ExpenseCategoryWhereUniqueInputSchema,
}).strict() ;

export const ExpenseCategoryUpdateArgsSchema: z.ZodType<Prisma.ExpenseCategoryUpdateArgs> = z.object({
  select: ExpenseCategorySelectSchema.optional(),
  include: ExpenseCategoryIncludeSchema.optional(),
  data: z.union([ ExpenseCategoryUpdateInputSchema,ExpenseCategoryUncheckedUpdateInputSchema ]),
  where: ExpenseCategoryWhereUniqueInputSchema,
}).strict() ;

export const ExpenseCategoryUpdateManyArgsSchema: z.ZodType<Prisma.ExpenseCategoryUpdateManyArgs> = z.object({
  data: z.union([ ExpenseCategoryUpdateManyMutationInputSchema,ExpenseCategoryUncheckedUpdateManyInputSchema ]),
  where: ExpenseCategoryWhereInputSchema.optional(),
}).strict() ;

export const ExpenseCategoryDeleteManyArgsSchema: z.ZodType<Prisma.ExpenseCategoryDeleteManyArgs> = z.object({
  where: ExpenseCategoryWhereInputSchema.optional(),
}).strict() ;

export const UserExpenseCategoryCreateArgsSchema: z.ZodType<Prisma.UserExpenseCategoryCreateArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  data: z.union([ UserExpenseCategoryCreateInputSchema,UserExpenseCategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const UserExpenseCategoryUpsertArgsSchema: z.ZodType<Prisma.UserExpenseCategoryUpsertArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  where: UserExpenseCategoryWhereUniqueInputSchema,
  create: z.union([ UserExpenseCategoryCreateInputSchema,UserExpenseCategoryUncheckedCreateInputSchema ]),
  update: z.union([ UserExpenseCategoryUpdateInputSchema,UserExpenseCategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserExpenseCategoryCreateManyArgsSchema: z.ZodType<Prisma.UserExpenseCategoryCreateManyArgs> = z.object({
  data: z.union([ UserExpenseCategoryCreateManyInputSchema,UserExpenseCategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserExpenseCategoryDeleteArgsSchema: z.ZodType<Prisma.UserExpenseCategoryDeleteArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  where: UserExpenseCategoryWhereUniqueInputSchema,
}).strict() ;

export const UserExpenseCategoryUpdateArgsSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateArgs> = z.object({
  select: UserExpenseCategorySelectSchema.optional(),
  include: UserExpenseCategoryIncludeSchema.optional(),
  data: z.union([ UserExpenseCategoryUpdateInputSchema,UserExpenseCategoryUncheckedUpdateInputSchema ]),
  where: UserExpenseCategoryWhereUniqueInputSchema,
}).strict() ;

export const UserExpenseCategoryUpdateManyArgsSchema: z.ZodType<Prisma.UserExpenseCategoryUpdateManyArgs> = z.object({
  data: z.union([ UserExpenseCategoryUpdateManyMutationInputSchema,UserExpenseCategoryUncheckedUpdateManyInputSchema ]),
  where: UserExpenseCategoryWhereInputSchema.optional(),
}).strict() ;

export const UserExpenseCategoryDeleteManyArgsSchema: z.ZodType<Prisma.UserExpenseCategoryDeleteManyArgs> = z.object({
  where: UserExpenseCategoryWhereInputSchema.optional(),
}).strict() ;

export const ExpenseCreateArgsSchema: z.ZodType<Prisma.ExpenseCreateArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  data: z.union([ ExpenseCreateInputSchema,ExpenseUncheckedCreateInputSchema ]),
}).strict() ;

export const ExpenseUpsertArgsSchema: z.ZodType<Prisma.ExpenseUpsertArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereUniqueInputSchema,
  create: z.union([ ExpenseCreateInputSchema,ExpenseUncheckedCreateInputSchema ]),
  update: z.union([ ExpenseUpdateInputSchema,ExpenseUncheckedUpdateInputSchema ]),
}).strict() ;

export const ExpenseCreateManyArgsSchema: z.ZodType<Prisma.ExpenseCreateManyArgs> = z.object({
  data: z.union([ ExpenseCreateManyInputSchema,ExpenseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExpenseDeleteArgsSchema: z.ZodType<Prisma.ExpenseDeleteArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereUniqueInputSchema,
}).strict() ;

export const ExpenseUpdateArgsSchema: z.ZodType<Prisma.ExpenseUpdateArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  data: z.union([ ExpenseUpdateInputSchema,ExpenseUncheckedUpdateInputSchema ]),
  where: ExpenseWhereUniqueInputSchema,
}).strict() ;

export const ExpenseUpdateManyArgsSchema: z.ZodType<Prisma.ExpenseUpdateManyArgs> = z.object({
  data: z.union([ ExpenseUpdateManyMutationInputSchema,ExpenseUncheckedUpdateManyInputSchema ]),
  where: ExpenseWhereInputSchema.optional(),
}).strict() ;

export const ExpenseDeleteManyArgsSchema: z.ZodType<Prisma.ExpenseDeleteManyArgs> = z.object({
  where: ExpenseWhereInputSchema.optional(),
}).strict() ;

export const RecurringExpenseCreateArgsSchema: z.ZodType<Prisma.RecurringExpenseCreateArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  data: z.union([ RecurringExpenseCreateInputSchema,RecurringExpenseUncheckedCreateInputSchema ]),
}).strict() ;

export const RecurringExpenseUpsertArgsSchema: z.ZodType<Prisma.RecurringExpenseUpsertArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  where: RecurringExpenseWhereUniqueInputSchema,
  create: z.union([ RecurringExpenseCreateInputSchema,RecurringExpenseUncheckedCreateInputSchema ]),
  update: z.union([ RecurringExpenseUpdateInputSchema,RecurringExpenseUncheckedUpdateInputSchema ]),
}).strict() ;

export const RecurringExpenseCreateManyArgsSchema: z.ZodType<Prisma.RecurringExpenseCreateManyArgs> = z.object({
  data: z.union([ RecurringExpenseCreateManyInputSchema,RecurringExpenseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RecurringExpenseDeleteArgsSchema: z.ZodType<Prisma.RecurringExpenseDeleteArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  where: RecurringExpenseWhereUniqueInputSchema,
}).strict() ;

export const RecurringExpenseUpdateArgsSchema: z.ZodType<Prisma.RecurringExpenseUpdateArgs> = z.object({
  select: RecurringExpenseSelectSchema.optional(),
  include: RecurringExpenseIncludeSchema.optional(),
  data: z.union([ RecurringExpenseUpdateInputSchema,RecurringExpenseUncheckedUpdateInputSchema ]),
  where: RecurringExpenseWhereUniqueInputSchema,
}).strict() ;

export const RecurringExpenseUpdateManyArgsSchema: z.ZodType<Prisma.RecurringExpenseUpdateManyArgs> = z.object({
  data: z.union([ RecurringExpenseUpdateManyMutationInputSchema,RecurringExpenseUncheckedUpdateManyInputSchema ]),
  where: RecurringExpenseWhereInputSchema.optional(),
}).strict() ;

export const RecurringExpenseDeleteManyArgsSchema: z.ZodType<Prisma.RecurringExpenseDeleteManyArgs> = z.object({
  where: RecurringExpenseWhereInputSchema.optional(),
}).strict() ;

export const CurrencyCreateArgsSchema: z.ZodType<Prisma.CurrencyCreateArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  data: z.union([ CurrencyCreateInputSchema,CurrencyUncheckedCreateInputSchema ]),
}).strict() ;

export const CurrencyUpsertArgsSchema: z.ZodType<Prisma.CurrencyUpsertArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema,
  create: z.union([ CurrencyCreateInputSchema,CurrencyUncheckedCreateInputSchema ]),
  update: z.union([ CurrencyUpdateInputSchema,CurrencyUncheckedUpdateInputSchema ]),
}).strict() ;

export const CurrencyCreateManyArgsSchema: z.ZodType<Prisma.CurrencyCreateManyArgs> = z.object({
  data: z.union([ CurrencyCreateManyInputSchema,CurrencyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CurrencyDeleteArgsSchema: z.ZodType<Prisma.CurrencyDeleteArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  where: CurrencyWhereUniqueInputSchema,
}).strict() ;

export const CurrencyUpdateArgsSchema: z.ZodType<Prisma.CurrencyUpdateArgs> = z.object({
  select: CurrencySelectSchema.optional(),
  include: CurrencyIncludeSchema.optional(),
  data: z.union([ CurrencyUpdateInputSchema,CurrencyUncheckedUpdateInputSchema ]),
  where: CurrencyWhereUniqueInputSchema,
}).strict() ;

export const CurrencyUpdateManyArgsSchema: z.ZodType<Prisma.CurrencyUpdateManyArgs> = z.object({
  data: z.union([ CurrencyUpdateManyMutationInputSchema,CurrencyUncheckedUpdateManyInputSchema ]),
  where: CurrencyWhereInputSchema.optional(),
}).strict() ;

export const CurrencyDeleteManyArgsSchema: z.ZodType<Prisma.CurrencyDeleteManyArgs> = z.object({
  where: CurrencyWhereInputSchema.optional(),
}).strict() ;

export const CountryCreateArgsSchema: z.ZodType<Prisma.CountryCreateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryCreateInputSchema,CountryUncheckedCreateInputSchema ]),
}).strict() ;

export const CountryUpsertArgsSchema: z.ZodType<Prisma.CountryUpsertArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
  create: z.union([ CountryCreateInputSchema,CountryUncheckedCreateInputSchema ]),
  update: z.union([ CountryUpdateInputSchema,CountryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CountryCreateManyArgsSchema: z.ZodType<Prisma.CountryCreateManyArgs> = z.object({
  data: z.union([ CountryCreateManyInputSchema,CountryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CountryDeleteArgsSchema: z.ZodType<Prisma.CountryDeleteArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryUpdateArgsSchema: z.ZodType<Prisma.CountryUpdateArgs> = z.object({
  select: CountrySelectSchema.optional(),
  include: CountryIncludeSchema.optional(),
  data: z.union([ CountryUpdateInputSchema,CountryUncheckedUpdateInputSchema ]),
  where: CountryWhereUniqueInputSchema,
}).strict() ;

export const CountryUpdateManyArgsSchema: z.ZodType<Prisma.CountryUpdateManyArgs> = z.object({
  data: z.union([ CountryUpdateManyMutationInputSchema,CountryUncheckedUpdateManyInputSchema ]),
  where: CountryWhereInputSchema.optional(),
}).strict() ;

export const CountryDeleteManyArgsSchema: z.ZodType<Prisma.CountryDeleteManyArgs> = z.object({
  where: CountryWhereInputSchema.optional(),
}).strict() ;