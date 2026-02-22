"use client"

import { useState } from "react"
import { ArrowRight, ShoppingCart, Shield, Truck, Star, Menu, X, Package, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function MediStoreLanding() {
    const features = [
        {
            icon: Shield,
            title: "Verified Products",
            description: "All medicines verified from certified pharmacies"
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            description: "Delivered to your doorstep within 24-48 hours"
        },
        {
            icon: Star,
            title: "Quality Assured",
            description: "100% authentic medicines with guarantee"
        },
        {
            icon: Clock,
            title: "24/7 Support",
            description: "Customer support available round the clock"
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            <section className="py-20 md:py-32 bg-linear-to-br from-primary/10 to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            Your Trusted Online Pharmacy
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                            Order medicines online with fast delivery, verified products, and 24/7 support
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/shop">
                                <Button size="lg" className="cursor-pointer">
                                    Shop Medicines <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/about">
                                <Button size="lg" variant="outline">Learn More</Button>
                            </Link>
                        </div>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <Input
                                type="text"
                                placeholder="Search for medicines, health products..."
                                className="h-14 pl-6 pr-32 text-lg"
                            />
                            <Button className="absolute right-2 top-2">Search</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose MediStore?</h2>
                        <p className="text-lg text-muted-foreground">
                            We provide the best online pharmacy experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, i) => (
                            <Card key={i} className="hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg mb-8 opacity-90">
                        Join thousands of customers who trust MediStore
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/signup">
                            <Button size="lg" variant="secondary" className="cursor-pointer">Create Account</Button>
                        </Link>
                        <Link href="/medicines">
                            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground dark:hover:bg-card">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}