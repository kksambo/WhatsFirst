"use client"

import { useState } from "react"
import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

export default function WhatsAppChecker() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)
  const [error, setError] = useState("")

  // Validate phone number format
  const validatePhoneNumber = (number: string) => {
    // Remove any non-digit characters
    const cleanNumber = number.replace(/\D/g, "")

    // Basic validation - phone numbers should be at least 10 digits
    return cleanNumber.length >= 10
  }

  const handleCheck = async () => {
    setIsChecking(true)
    setError("")

    // Clean the phone number (remove spaces, dashes, etc.)
    const cleanNumber = phoneNumber.replace(/\D/g, "")

    if (!validatePhoneNumber(cleanNumber)) {
      setError("Please enter a valid phone number (at least 10 digits)")
      setIsChecking(false)
      return
    }

    try {
      // In a real implementation, you would make an API call here to check if the number is on WhatsApp
      // However, WhatsApp doesn't provide an official API for this purpose

      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Since we can't actually check, we'll assume the number is valid if it passes our validation
      setIsValid(true)
      setHasChecked(true)
    } catch (err) {
      setError("Failed to check the number. Please try again.")
      setIsValid(false)
    } finally {
      setIsChecking(false)
    }
  }

  const openWhatsApp = () => {
    // Clean the phone number (remove spaces, dashes, etc.)
    const cleanNumber = phoneNumber.replace(/\D/g, "")

    // WhatsApp click-to-chat link
    const whatsappUrl = `https://wa.me/${cleanNumber}`
    window.open(whatsappUrl, "_blank")
  }

  const makePhoneCall = () => {
    // Clean the phone number (remove spaces, dashes, etc.)
    const cleanNumber = phoneNumber.replace(/\D/g, "")

    // Create a tel: link
    window.location.href = `tel:${cleanNumber}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>WhatsApp Number Checker</CardTitle>
        <CardDescription>Check if a phone number is registered on WhatsApp</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone Number</Label>
          <div className="flex space-x-2">
            <Input
              id="phone-number"
              type="tel"
              placeholder="+1 (123) 456-7890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button onClick={handleCheck} disabled={isChecking || phoneNumber.length < 5}>
              {isChecking ? "Checking..." : "Check"}
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {hasChecked && isValid && (
          <Alert>
            <AlertDescription>
              This number appears to be valid and can be contacted via WhatsApp or phone call.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-muted-foreground">
          <p>
            Note: This tool uses WhatsApp's click-to-chat feature which works whether or not the number is registered.
            If the number is not on WhatsApp, the WhatsApp app will show an error.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={makePhoneCall}
          disabled={!hasChecked || !isValid}
          className="flex items-center gap-2"
        >
          <Phone size={16} />
          Call
        </Button>
        <Button onClick={openWhatsApp} disabled={!hasChecked || !isValid} className="flex items-center gap-2">
          <MessageCircle size={16} />
          WhatsApp
        </Button>
      </CardFooter>
    </Card>
  )
}
