import csv

from ox.apps.locations.models import Country
from ox.apps.contacts import models


countries = {c.code: c for c in Country.objects.all()}

# Source: https://github.com/Gawaboumga/iso-20275-python/blob/master/iso20275/Cleaned%20-%20with%20additional%20-%20ISO-20275%20-%202023-09-28.csv
with open("data/locations/sources/entity-types.csv") as stream:
    data = csv.DictReader(stream)
    items = []
    for dat in data:
        print(dat)
        if not dat["country"] or dat["country"] not in countries or dat["status"] == "INAC":
            continue
        items.append(
            models.OrganisationType(
                name=dat["name"],
                code=dat["code"],
                abbreviation=dat["abbreviation"],
                language_code=dat["language_code"],
                country=countries[dat["country"]],
            )
        )
    breakpoint()
