import { addItem, editItem } from "@/api/items";
import { SelectItem } from "@/components/ui/select";
import { formSchema } from "@/lib/schema";
import { Item } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { City, Country, State } from "country-state-city";
import { useMemo, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

export const useItemForm = (item: Item | undefined) => {
  const navigate = useNavigate();
  const allCountries = useMemo(() => {
    return Country.getAllCountries().map((country) => country);
  }, []);
  const allStates = useMemo(() => {
    return State.getAllStates().map((state) => state);
  }, []);

  const [currentCountryCode, setCurrentCountryCode] = useState(
    allCountries.find((country) => country.name === item?.country)?.isoCode ||
      ""
  );
  const [currentStateCode, setCurrentStateCode] = useState(
    allStates.find((state) => state.name === item?.state)?.isoCode || ""
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [responseMessage, setReponseMessage] = useState({
    title: "",
    message: ""
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      phone: item?.phone || "",
      email: item?.email || "",
      confirmEmail: item?.confirmEmail || "",
      country: item?.country || "",
      state: item?.state || "",
      city: item?.city || "",
      agreement: item?.agreement || undefined,
      checkboxGroup: {
        acceptLicenseTerms: item?.checkboxGroup?.acceptLicenseTerms || false,
        sendNewsByEmail: item?.checkboxGroup?.sendNewsByEmail || false
      }
    }
  });

  const isStateSelectDisabled =
    form.getValues("country") === "" ||
    State.getStatesOfCountry(currentCountryCode).length === 0;

  const statesOfCountry = useMemo(
    () => State.getStatesOfCountry(currentCountryCode),
    [currentCountryCode]
  );
  const citiesOfState = useMemo(
    () => City.getCitiesOfState(currentCountryCode, currentStateCode),
    [currentCountryCode, currentStateCode]
  );

  const citiesOfCountry = useMemo(
    () => City.getCitiesOfCountry(currentCountryCode),
    [currentCountryCode]
  );

  const isCitiesSelectDisabled = useMemo(() => {
    return (
      currentCountryCode.length === 0 ||
      (currentStateCode.length === 0 && statesOfCountry.length !== 0) ||
      citiesOfState.length === 0 ||
      citiesOfCountry?.length === 0
    );
  }, [
    currentCountryCode,
    currentStateCode,
    citiesOfState,
    statesOfCountry,
    citiesOfCountry
  ]);

  async function onSubmit() {
    const agreement = form.getValues("agreement");
    const acceptLicenseTerms = form.getValues(
      "checkboxGroup.acceptLicenseTerms"
    );
    if (agreement === "license" && !acceptLicenseTerms) {
      form.setError("checkboxGroup.acceptLicenseTerms", {
        message: "You must accept the license terms"
      });
    } else {
      const formValues = form.getValues();
      const newItem: Item = {
        ...formValues,
        createdDate: new Date().toLocaleDateString(),
        updatedDate: new Date().toLocaleDateString()
      };
      const itemCopy = { ...item };
      delete itemCopy.id;
      delete itemCopy.createdDate;
      delete itemCopy.updatedDate;
      if (item) {
        const response = await editItem(item?.id as string, newItem);
        if (response?.ok) {
          const data: { message: string } = await response.json();
          setIsDialogOpen(true);
          setReponseMessage({
            title: "Item edit",
            message: data.message
          });
        }
      } else {
        const response = await addItem(newItem);
        if (response?.ok) {
          const data: { message: string } = await response.json();
          setIsDialogOpen(true);
          setReponseMessage({
            title: "Item creation",
            message: data.message
          });
        }
      }
    }
  }

  const handleCountryChange = (
    field: ControllerRenderProps<z.infer<typeof formSchema>, "country">,
    value: string
  ) => {
    const countryObj = allCountries.find((country) => country.name === value);
    field.onChange(value);
    setCurrentCountryCode(countryObj?.isoCode || "");
    setCurrentStateCode("");
    form.setValue("state", " ");
    form.setValue("city", " ");
  };

  const handleStateChange = (
    field: ControllerRenderProps<z.infer<typeof formSchema>, "state">,
    value: string
  ) => {
    const stateObj = allStates.find((state) => state.name === value);
    field.onChange(stateObj?.name);
    setCurrentStateCode(stateObj?.isoCode || "");
    form.setValue("city", "");
  };

  const renderCitiesSelectContent = (
    field: ControllerRenderProps<z.infer<typeof formSchema>, "city">
  ) => {
    return isCitiesSelectDisabled && item ? (
      <SelectItem value={field.value || " "}>{field.value}</SelectItem>
    ) : currentCountryCode.length !== 0 && currentStateCode.length !== 0 ? (
      citiesOfState.map((city, index) => (
        <SelectItem key={city.name + index} value={city.name}>
          {city.name}
        </SelectItem>
      ))
    ) : (
      citiesOfCountry?.map((city, index) => (
        <SelectItem key={city.name + index} value={city.name}>
          {city.name}
        </SelectItem>
      ))
    );
  };

  const renderStateSelectContent = (
    field: ControllerRenderProps<z.infer<typeof formSchema>, "state">
  ) => {
    return form.getValues("country") === "" ||
      (statesOfCountry.length === 0 && item) ? (
      <SelectItem value={field.value || " "}>{field.value}</SelectItem>
    ) : (
      statesOfCountry.map((state, index) => (
        <SelectItem key={state.name + index} value={state.name}>
          {state.name}
        </SelectItem>
      ))
    );
  };

  return {
    form,
    navigate,
    onSubmit,
    isCitiesSelectDisabled,
    isDialogOpen,
    setIsDialogOpen,
    responseMessage,
    setReponseMessage,
    handleCountryChange,
    handleStateChange,
    renderCitiesSelectContent,
    renderStateSelectContent,
    isStateSelectDisabled,
    allCountries
  };
};
