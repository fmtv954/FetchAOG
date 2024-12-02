"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  tailNumber: z.string().min(2).max(7),
  partNumber: z.string().min(2).max(20),
  location: z.string().length(3),
  flightDate: z.string(),
})

export function AOGForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tailNumber: "",
      partNumber: "",
      location: "",
      flightDate: new Date().toISOString().split('T')[0],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Here we would make the API calls to AviationStack and OpenSky
      // For now we'll just show a success message
      toast({
        title: "AOG Event Submitted",
        description: `Tracking AOG event for aircraft ${values.tailNumber}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit AOG event. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="tailNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tail Number</FormLabel>
                <FormControl>
                  <Input placeholder="N12345" {...field} />
                </FormControl>
                <FormDescription>
                  Aircraft registration number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="partNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Number</FormLabel>
                <FormControl>
                  <Input placeholder="PN4567" {...field} />
                </FormControl>
                <FormDescription>
                  AOG part identification
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="LAX" {...field} />
                </FormControl>
                <FormDescription>
                  IATA airport code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="flightDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flight Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  Date of AOG event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit AOG Event</Button>
      </form>
    </Form>
  )
}

