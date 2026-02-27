'use client'

import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>

      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        loadingTimerID = setTimeout(() => setIsLoading(true), 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })

          const res = await req.json()
          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        } catch {
          setIsLoading(false)
          setError({ message: 'Something went wrong.' })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <section className="min-h-screen mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
        {/* LEFT: SQUARE IMAGE CARD */}
        <div className="flex flex-col gap-8">
          {/* Contact Info Card */}
          <div className="border border-border/50 rounded-2xl p-6 bg-gradient-to-br from-background to-muted/30 shadow-sm">
            <h4 className="text-lg font-semibold mb-6 text-foreground">Contact Information</h4>

            <div className="space-y-5">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Call us</p>
                  <a
                    href="tel:+254729396862"
                    className="text-lg font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2"
                  >
                    +254 720 479096
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Email us</p>
                  <a
                    href="mailto:info@fountainmovers.co.ke"
                    className="text-lg font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2"
                  >
                    info@fountainmovers.co.ke
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <p className="text-lg font-medium text-foreground">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-border/30">
              <p className="text-sm text-muted-foreground mb-4">Connect with us</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: SCROLLABLE FORM CARD */}
        <div className="border border-border/50 rounded-2xl bg-background shadow-xl overflow-hidden flex flex-col h-[600px] lg:h-[700px]">
          {/* Form Header */}
          <div className="p-6 md:p-8 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
            <h3 className="text-2xl font-bold text-foreground mb-2">Get a Free Quote</h3>
            <p className="text-muted-foreground">
              Fill out the form below and our team will contact you within 24 hours
            </p>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <FormProvider {...formMethods}>
              {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <div className="rounded-xl bg-green-50 border border-green-200 p-6 mb-6">
                  <RichText data={confirmationMessage} />
                </div>
              )}

              {isLoading && !hasSubmitted && (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
                  <h4 className="text-xl font-semibold mb-2">Submitting your request</h4>
                  <p className="text-muted-foreground">
                    Please wait while we process your information...
                  </p>
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-6">
                  <p className="text-red-800 font-medium">
                    {`${error.status || '500'}: ${error.message || ''}`}
                  </p>
                </div>
              )}

              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-4">
                  <div className="space-y-4">
                    {formFromProps?.fields?.map((field, index) => {
                      const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]

                      return Field ? (
                        <div key={index} className="space-y-2">
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      ) : null
                    })}
                  </div>

                  {/* Sticky Submit Button */}
                  <div className="sticky bottom-0 pt-6 bg-background border-t border-border/30 mt-8">
                    <Button
                      form={formID}
                      type="submit"
                      variant="default"
                      size="lg"
                      disabled={isLoading}
                      className="w-full h-12 text-base font-medium shadow-lg hover:shadow-xl transition-shadow"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-3">
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Processing Request...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          {submitButtonLabel || 'Submit Request'}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-3">
                      By submitting, you agree to our Terms & Privacy Policy
                    </p>
                  </div>
                </form>
              )}
            </FormProvider>
          </div>
        </div>
      </div>
    </section>
  )
}
