"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
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
import { AdminStatics, Order } from "@/types/admin"

export const description = "A bar chart with a label"

const chartConfig = {
    count: {
        label: "Total",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

type ChartBarLabelProps = {
    data: Order
}
type ChartData = {
    status: string;
    count: number;
}

export function ChartBarLabel({ data }: ChartBarLabelProps) {
    const chartData = Object.entries(data).reduce((final: ChartData[], [status, count]) => {
        if (status === "total") {
            return final;
        }
        final.push({
            status,
            count
        })
        return final;
    }, []);
    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="status"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" fill="var(--color-count)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Showing total orders over the time
                </div>
            </CardFooter>
        </Card>
    )
}
