import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function Home() {
  return (
    <div className="bg-background text-foreground h-[100%] p-4 w-[100%]">
      <div className="w-[100%]">
        <Sheet>

          <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent className="text-foreground">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-foreground">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3  text-muted-foreground" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right text-foreground">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3  text-muted-foreground" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

    </div>
  );
}
