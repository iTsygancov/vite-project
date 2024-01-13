import NotificationDialog from "../NotificationDialog/NotificationDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useItemForm } from "@/lib/containers/itemForm";
import { Item } from "@/lib/types";
import { ChevronLeftIcon } from "lucide-react";

type EditFormProps = {
  item?: Item;
};

const EditForm = ({ item }: EditFormProps) => {
  const {
    form,
    navigate,
    onSubmit,
    isCitiesSelectDisabled,
    isDialogOpen,
    setIsDialogOpen,
    responseMessage,
    handleCountryChange,
    handleStateChange,
    renderCitiesSelectContent,
    isStateSelectDisabled,
    renderStateSelectContent,
    allCountries
  } = useItemForm(item);

  return (
    <div className='h-full flex-grow space-y-8 bg-gray-100 px-6 py-8 dark:bg-gray-900'>
      <Button onClick={() => navigate("/")} size='sm' variant='outline'>
        <ChevronLeftIcon className='mr-2 size-4' />
        Back
      </Button>
      <div className='space-y-2'>
        <h3 className='text-3xl font-medium text-gray-700 dark:text-gray-200'>
          {item ? "Edit item" : "Add new item"}
        </h3>
        {item && (
          <p className='text-gray-500 dark:text-gray-400'>
            Make changes to the data here. Click save when you're done.
          </p>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder='Phone' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!item && (
            <FormField
              control={form.control}
              name='confirmEmail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Confirm Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className='grid grid-cols-3 gap-4'>
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='country'>Country</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => handleCountryChange(field, value)}
                  >
                    <FormControl>
                      <SelectTrigger id='country'>
                        <SelectValue placeholder='Select' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position='popper'>
                      {allCountries.map((country, index) => (
                        <SelectItem
                          key={country.name + index}
                          value={country.name}
                        >
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='state'>State</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={(value) => handleStateChange(field, value)}
                  >
                    <FormControl>
                      <SelectTrigger
                        disabled={isStateSelectDisabled}
                        id='state'
                      >
                        <SelectValue placeholder='Select' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position='popper'>
                      {renderStateSelectContent(field)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='city'>City</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger
                        disabled={isCitiesSelectDisabled}
                        id='city'
                      >
                        <SelectValue placeholder='Select' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position='popper'>
                      {renderCitiesSelectContent(field)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!item && (
            <>
              <FormField
                control={form.control}
                name='agreement'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Choose agreement type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex flex-col space-y-1'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='license' />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            Under License Agreement
                          </FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='mutual' />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            By Mutual Consent
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex space-x-8'>
                {form.watch("agreement") === "license" && (
                  <FormField
                    control={form.control}
                    name='checkboxGroup.acceptLicenseTerms'
                    render={({ field }) => {
                      return (
                        <div className='flex flex-col space-y-3'>
                          <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              Accept License Terms
                            </FormLabel>
                          </FormItem>
                          <FormMessage />
                        </div>
                      );
                    }}
                  />
                )}
                {form.watch("agreement") && (
                  <FormField
                    control={form.control}
                    name='checkboxGroup.sendNewsByEmail'
                    render={({ field }) => {
                      return (
                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            Send news by email
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                )}
              </div>
            </>
          )}
          <div className='pt-4'>
            {item ? (
              <Button className='ml-auto w-full' type='submit'>
                Save
              </Button>
            ) : (
              <Button className='ml-auto w-full' type='submit'>
                Add item
              </Button>
            )}
          </div>
        </form>
      </Form>
      <NotificationDialog
        description={responseMessage.message}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={responseMessage.title}
        id={item?.id}
      />
    </div>
  );
};

export default EditForm;
