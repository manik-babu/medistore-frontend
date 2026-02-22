import Link from "next/link";

export default function AppFooter() {
    return (
        <footer className="py-12 border-t">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-4">MediStore</h3>
                        <p className="text-muted-foreground text-sm">
                            Your trusted online pharmacy for quality medicines.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/shop" className="text-muted-foreground hover:text-primary">Medicines</Link></li>
                            <li><Link href="/categories" className="text-muted-foreground hover:text-primary">Categories</Link></li>
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-muted-foreground hover:text-primary">Shipping</Link></li>
                            <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>support@medistore.com</li>
                            <li>+1 (555) 123-4567</li>
                            <li>Available 24/7</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; 2026 MediStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}