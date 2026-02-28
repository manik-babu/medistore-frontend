import { Shield, Truck, Heart, Award, Users, CheckCircle, MoveRight, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutUsPage() {
    const values = [
        {
            icon: Shield,
            title: "Trust & Safety",
            description: "All medicines are verified and sourced from certified pharmacies ensuring authenticity and quality."
        },
        {
            icon: Heart,
            title: "Customer First",
            description: "Your health and satisfaction are our top priorities. We're here to serve you 24/7."
        },
        {
            icon: Award,
            title: "Quality Assurance",
            description: "100% genuine products with quality guarantee. We never compromise on standards."
        },
        {
            icon: Truck,
            title: "Fast Delivery",
            description: "Quick and reliable delivery to your doorstep within 24-48 hours."
        }
    ]

    const stats = [
        { value: "10K+", label: "Happy Customers" },
        { value: "500+", label: "Medicines Available" },
        { value: "50+", label: "Trusted Sellers" },
        { value: "24/7", label: "Customer Support" }
    ]

    const features = [
        "Verified and licensed pharmacies",
        "Genuine medicines with quality guarantee",
        "Secure payment gateway",
        "Fast and reliable delivery",
        "Easy returns and refunds",
        "24/7 customer support",
        "Prescription management",
        "Order tracking"
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            About <span className="text-primary">MediStore</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                            Your trusted partner in healthcare. We're on a mission to make quality medicines
                            accessible to everyone, delivered right to your doorstep with care and compassion.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/shop">
                                <Button size="lg">Start Shopping <ArrowRight /></Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-y bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-muted-foreground">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Founded in 2020, MediStore was born from a simple idea: everyone deserves easy
                                access to quality healthcare products. What started as a small pharmacy has grown
                                into a trusted online platform serving thousands of customers across the country.
                            </p>
                            <p>
                                We understand that health is wealth, and finding the right medicines shouldn't be
                                a hassle. That's why we've partnered with certified pharmacies and healthcare
                                professionals to bring you a seamless, reliable, and secure online pharmacy experience.
                            </p>
                            <p>
                                Today, MediStore stands as a testament to our commitment to quality, trust, and
                                customer satisfaction. We're not just selling medicines; we're delivering health
                                and peace of mind to your doorstep.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            These principles guide everything we do at MediStore
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardContent className="pt-6 text-center">
                                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                            <Icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose MediStore?</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-6">Our Features</h3>
                                <div className="space-y-3">
                                    {features.slice(0, 4).map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-6">More Benefits</h3>
                                <div className="space-y-3">
                                    {features.slice(4).map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Heart className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    To provide accessible, affordable, and authentic healthcare products to everyone,
                                    making quality healthcare a reality for all through innovation and compassion.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-primary/5 to-transparent">
                            <CardContent className="pt-6">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Award className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    To become the most trusted online pharmacy platform, setting new standards in
                                    healthcare delivery, customer service, and digital health innovation.
                                </p>
                            </CardContent>
                        </Card>
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
                        <Link href="/shop">
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