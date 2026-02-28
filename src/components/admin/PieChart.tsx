"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
const chartConfig = {
    total: {
        label: "Total",
    },
    customer: {
        label: "Customer",
        color: "var(--chart-1)",
    },
    seller: {
        label: "Seller",
        color: "var(--chart-2)",
    }

} satisfies ChartConfig

type ChartPieLabelListProps = {
    customer: {
        total: number;
        banned: number;
    },
    seller: {
        total: number;
        banned: number;
    }
}
export function ChartPieLabelList({ customer, seller }: ChartPieLabelListProps) {
    const chartData = [
        { role: "customer", total: customer.total, fill: "var(--color-customer)" },
        { role: "seller", total: seller.total, fill: "var(--color-seller)" },

    ]
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>User Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="total" hideLabel />}
                        />
                        <Pie data={chartData} dataKey="total">
                            <LabelList
                                dataKey="role"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: keyof typeof chartConfig) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Showing total users for all over the time
                </div>
            </CardFooter>
        </Card>
    )
}
