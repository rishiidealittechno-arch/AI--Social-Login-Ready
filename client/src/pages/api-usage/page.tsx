import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { SpendingChart } from "./components/areachart-spending"
import { Field, FieldLabel } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import StrasticsChart from "./components/strastics-chart"

const Page = () => {
  return (
    <div className='px-8 pb-4 pt-2 flex flex-col gap-8'>
      <div>
        <Item className="p-0 pb-4">
          <ItemContent>
            <ItemTitle>Statistics</ItemTitle>
            <ItemDescription>
              See your API usage statistics over the last 30 days
            </ItemDescription>
          </ItemContent>
        </Item>
        <div className="grid grid-cols-8 gap-4">
          <Item variant="muted">
            <ItemContent>
              <ItemTitle className="text-2xl">10,233</ItemTitle>
              <ItemDescription className="mt-4 line-clamp-3">
                Number of total API requests made in the last 30 days
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle className="text-2xl">92,233</ItemTitle>
              <ItemDescription className="mt-4 line-clamp-3">
                Number of prompt tokens used in the last 30 days
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="muted">
            <ItemContent>
              <ItemTitle className="text-2xl">192 M</ItemTitle>
              <ItemDescription className="mt-4 line-clamp-3">
                Number of completion tokens used in the last 30 days
              </ItemDescription>
            </ItemContent>
          </Item>
        </div>

      </div>
      <div>
        <Item className="p-0 pb-4">
          <ItemContent>
            <ItemTitle>Credit Usage</ItemTitle>
            <ItemDescription>
              See your credit usage over the last 30 days
            </ItemDescription>
            <Field className="w-full max-w-sm">
              <FieldLabel htmlFor="progress-upload">
                <span className="ml-auto">26%</span>
              </FieldLabel>
              <Progress className="mt-2 h-8 rounded-lg" value={26} id="progress-upload" />
            </Field>

          </ItemContent>
        </Item>
      </div>
      <div>
        <Item className="p-0 pb-4">
          <ItemContent>
            <ItemTitle>API Usage</ItemTitle>
            <ItemDescription>
              See how your API usage is trending over time
            </ItemDescription>
          </ItemContent>
        </Item>
        <div className="grid grid-cols-3 gap-4">
          <StrasticsChart />
          <SpendingChart />
        </div>

      </div>
    </div>
  )
}

export default Page