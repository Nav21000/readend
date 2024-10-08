'use client'  

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

import { LoadingButton } from "@/components/loading-button"

const formSchema = z.object({
  title: z.string().min(1).max(250),
})
export default function UploadDcoumentForm({
    onUpload,
}:{
    onUpload:()=>void
}
) {
    const createDocument= useMutation(api.documents.createDocument)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        await new Promise((resolve)=>setTimeout(resolve,2000));
       await createDocument(values)
        onUpload()

      }
    
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Expense Report" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <LoadingButton
        isloading={form.formState.isSubmitting}
        loadingText ="Uploading..."
        >Upload
      </LoadingButton>
    </form>
  </Form>

  )
}
