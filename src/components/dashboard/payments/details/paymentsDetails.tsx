"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function PaymentsDetails() {
  return (
    <div className="w-full space-y-7">
      {/* Grid Layout - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 w-full">
        {/* Left Column - Transaction Summary */}
        <Card className="border col-span-1 lg:col-span-6 border-gray-200">
          <CardContent className="px-6 ">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Transaction Summary
            </h2>

            <div className="space-y-6">
              {/* Amount and Payment Method Row */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Amount</p>
                  <p className="text-lg font-semibold text-gray-900">%50.00</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Payment method</p>
                  <p className="text-base text-gray-900">Stripe</p>
                </div>
              </div>

              {/* Date and Status Row */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Date</p>
                  <p className="text-base text-gray-900">July 26, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Status</p>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Successful
                  </Badge>
                </div>
              </div>

              {/* Reference Number */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Reference Number</p>
                <p className="text-base text-gray-900">REF12345</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Download / Actions */}
        <Card className="border col-span-1 lg:col-span-2 w-full border-gray-200">
          <CardContent className="px-6 w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Download / Actions
            </h2>

            <div className="space-y-3 w-full">
              <Button
                variant="outline"
                className="w-full justify-center h-11 bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-900"
              >
                Download Invoice (PDF)
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center h-11 bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-900"
              >
                Reorder Prescription
              </Button>
              <Button className="w-full justify-center h-11 bg-peter hover:bg-peter/90 text-white">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column Bottom - Prescription / Request linked */}
        <Card className="border col-span-1 lg:col-span-3 border-gray-200">
          <CardContent className="px-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Prescription / Request linked
            </h2>

            <div className="space-y-5">
              {/* Prescription ID and Pharmacy */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Prescription ID</p>
                  <p className="text-base text-gray-900">RX98765</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Pharmacy</p>
                  <p className="text-base text-gray-900">HealthPlus Pharmacy</p>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Delivery Address</p>
                <p className="text-base text-gray-900">
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </p>
              </div>

              {/* Delivery On */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Delivery On</p>
                <p className="text-base text-gray-900">July 27, 2025</p>
              </div>

              {/* Billing Information */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Billing Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Name: </span>
                    <span className="text-gray-900">Sara Johnson</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email: </span>
                    <span className="text-gray-900">
                      sara.johnson@gmail.com
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Billing Address: </span>
                    <span className="text-gray-900">
                      1901 Thornridge Cir. Shiloh, Hawaii 81063
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column Bottom - Payment Breakdown */}
        <Card className="border col-span-1 lg:col-span-2 w-full border-gray-200">
          <CardContent className="px-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Payment Breakdown
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="text-gray-900 font-medium">$5.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-900 font-medium">$2.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900 font-medium">$2.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Patient Name</span>
                <span className="text-red-600 font-medium">-$10.00</span>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">$50.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
