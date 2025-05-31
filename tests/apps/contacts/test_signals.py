def test_sync_user_to_contact_with_new(user):
    # simple check that it exists
    contact = getattr(user, "contact", None)
    assert contact and (
        (contact.first_name, contact.last_name, contact.email) == (user.first_name, user.last_name, user.email)
    )


def test_sync_user_to_contact_with_existing(user):
    user.first_name = "New Name"
    user.email = "new@mail.com"
    user.save()

    assert user.contact.first_name == user.first_name
    assert user.contact.email == user.email
