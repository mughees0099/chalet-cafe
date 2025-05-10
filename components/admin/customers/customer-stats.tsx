import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface CustomerStatsProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  description: string
}

export default function CustomerStats({ title, value, change, trend, description }: CustomerStatsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-400">{title}</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-bold">{value}</p>
            <div className="flex items-center">
              {trend === "up" ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
              ) : trend === "down" ? (
                <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
              ) : null}
              <span className={trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-400"}>
                {change}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
