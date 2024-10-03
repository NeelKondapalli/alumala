from django.core.management.base import BaseCommand
from app.models import Profile

class Command(BaseCommand):
    help = 'Displays profiles can be shown from the PostgreSQL database in the terminal'

    def handle(self, *args, **kwargs):
        profiles = Profile.objects.all()
        for profile in profiles:
            self.stdout.write(self.style.SUCCESS(f'{profile.id}-{profile.name}'))
            print(profile.name)