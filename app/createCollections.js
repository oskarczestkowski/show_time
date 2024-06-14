(async () => {
    const { default: PocketBase } = await import('pocketbase');

    const client = new PocketBase('http://127.0.0.1:8090');

    // Funkcja do tworzenia kolekcji
    async function createCollections() {
        try {
            // Uwierzytelnienie jako admin
            await client.admins.authWithPassword('admin@admin.com', 'oskar725204');

            console.log('Authenticated successfully');


            // Tworzenie kolekcji 'artists' z polem 'genre' jako dropdown
            await client.collections.create({
                name: 'artists',
                schema: [
                    { name: 'user_id', type: 'relation', required: true, options: { collectionId: 'users', cascadeDelete: true } },
                    { name: 'bio', type: 'text' },
                    { name: 'genre', type: 'select', required: true, options: { values: ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic'] } },
                    { name: 'website', type: 'url' },
                    { name: 'social_media_links', type: 'json' }
                ]
            });

            console.log('Collection "artists" created successfully');

            // Tworzenie kolekcji 'organizers'
            await client.collections.create({
                name: 'organizers',
                schema: [
                    { name: 'user_id', type: 'relation', required: true, options: { collectionId: 'users', cascadeDelete: true } },
                    { name: 'company_name', type: 'text' },
                    { name: 'website', type: 'url' },
                    { name: 'social_media_links', type: 'json' }
                ]
            });

            console.log('Collection "organizers" created successfully');

            // Tworzenie kolekcji 'events'
            await client.collections.create({
                name: 'events',
                schema: [
                    { name: 'organizer_id', type: 'relation', required: true, options: { collectionId: 'organizers', cascadeDelete: true } },
                    { name: 'name', type: 'text', required: true },
                    { name: 'description', type: 'text' },
                    { name: 'date', type: 'datetime', required: true },
                    //{ name: 'location', type: 'geopoint', required: true },
                    { name: 'artists_interested', type: 'relation', options: { collectionId: 'artists', multiple: true } }
                ]
            });

            console.log('Collection "events" created successfully');
        } catch (error) {
            console.error('Error creating collections:', error);
        }
    }

    createCollections();
})();
