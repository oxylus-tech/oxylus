import csv

from ox.apps.locations.models import Country, Currency

with open("data/locations/codes-all.csv") as stream:
    data = [dat for dat in csv.DictReader(stream) if not dat["valid_to"]]
    by_country = {dat["country"]: dat for dat in data}
    by_code = {dat["numeric"]: dat for dat in data}


with open("data/locations/currencies.csv") as stream:
    for row in csv.DictReader(stream, delimiter=";"):
        if dat := by_code.get(row["numeric"]):
            dat["country_code"] = row["country"]
            by_country[row["country"]] = dat
        else:
            print("Missing currency", row)


currencies = {}
for dat in data:
    if dat["numeric"] in currencies or dat["valid_to"]:
        continue

    print(dat)
    currency = Currency(
        name=dat["name"],
        code=dat["code"],
        numeric=dat["numeric"],
        decimals=int(dat["decimals"]) if dat["decimals"] not in ("", "-") else None,
        is_iso=True,
    )
    currencies[currency.numeric] = currency

breakpoint()
print("--------------------")
countries = list(Country.objects.all())
for country in countries:
    dat = by_country.get(country.code) or by_country.get(country.name.upper().replace(",", ""))
    if dat:
        country.currency = currencies[dat["numeric"]]
    else:
        print("Missing value for country", country.name, country.code)

breakpoint()

Currency.objects.bulk_create(currencies.values())
Country.objects.bulk_update(countries, ["currency"])
