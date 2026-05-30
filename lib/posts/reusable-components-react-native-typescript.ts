import type { BlogPost } from '../blog';

const post: BlogPost = {
    id: '29',
    slug: 'reusable-components-react-native-typescript',
    title: 'How to Structure Reusable Components in React Native with TypeScript',
    excerpt: 'One decision made at the start of a React Native project determines whether the codebase stays maintainable at scale — or becomes a folder of one-off components nobody wants to touch.',
    date: '2026-05-28',
    readTime: '6 min read',
    tags: ['React Native', 'TypeScript', 'React', 'Mobile', 'Components', 'Clean Code'],
    content: `
<h2>Why This Decision Matters Early</h2>
<p>React Native projects tend to start fast. A screen here, a card there, a button copied from the previous screen with one prop changed. Six weeks in, the same card component exists in nine different files — each with slightly different padding, a slightly different shadow, a slightly different border radius. Changing the design means hunting down every copy.</p>
<p>The fix is not discipline. It is structure. When there is a clear folder for every type of component, the right decision becomes the obvious one.</p>

<h2>Three Folders — Everything Fits Somewhere</h2>
<pre><code>components/
  ui/               ← no business logic, pure display
    Card.tsx
    Button.tsx
    Badge.tsx
    Avatar.tsx

  layout/           ← structure shared across screens
    ScreenWrapper.tsx
    Header.tsx
    TabBar.tsx

  features/         ← specific to one domain
    listings/
      ListingCard.tsx
      ListingGrid.tsx
    profile/
      ProfileHeader.tsx
      ProfileStats.tsx</code></pre>

<p><strong>ui/</strong> — components that know nothing about your application. They receive data via props and render it. No API calls, no navigation, no business logic. A <code>Card</code> is just a styled container. A <code>Button</code> is just a pressable element with a label. They work anywhere.</p>
<p><strong>layout/</strong> — components that define the structure of a screen. A <code>ScreenWrapper</code> handles safe area insets and scroll behaviour consistently. A <code>Header</code> renders the same back button and title pattern across every screen. These components don't know what content surrounds them.</p>
<p><strong>features/</strong> — components tied to a specific domain. A <code>ListingCard</code> knows about property listings. A <code>ProfileHeader</code> knows about user profiles. They live close to the feature they belong to and can use data-fetching hooks, navigation, or application state.</p>

<h2>The One Rule</h2>
<p>If a component appears on more than one screen, it belongs in <code>ui/</code>.</p>
<p>That's it. Apply it consistently and the structure stays clean without any active effort.</p>

<h2>What a Reusable Card Component Looks Like in TypeScript</h2>
<p>In React Native there is no <code>className</code>. Flexibility comes from accepting a <code>style</code> prop typed as <code>StyleProp&lt;ViewStyle&gt;</code> — which allows any valid React Native style, including arrays of styles, to be passed in and merged at the call site.</p>

<pre><code>import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp&lt;ViewStyle&gt;;
}

export function Card({ children, style }: CardProps) {
  return (
    &lt;View style={[styles.card, style]}&gt;
      {children}
    &lt;/View&gt;
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});</code></pre>

<p>Now the same <code>Card</code> works across every screen. You override spacing or background at the call site by passing a <code>style</code> prop — no new props required inside the component.</p>

<pre><code>// Listing screen
&lt;Card style={{ marginBottom: 12 }}&gt;
  &lt;ListingContent listing={listing} /&gt;
&lt;/Card&gt;

// Profile screen
&lt;Card style={{ backgroundColor: '#f9f9f9' }}&gt;
  &lt;ProfileStats user={user} /&gt;
&lt;/Card&gt;</code></pre>

<p>One component. Two completely different screens. Zero new props inside <code>Card</code>.</p>

<h2>Keep Prop Interfaces Focused</h2>
<p>A component accumulating conditional props is a component doing too much. The moment you find yourself adding <code>showBadge</code>, <code>variant</code>, and <code>onLongPress</code> to the same component, it needs to be split.</p>

<pre><code>// ❌ Too many responsibilities in one component
&lt;ListingCard
  listing={listing}
  showFavourite
  showBadge
  variant="featured"
  onPress={handlePress}
  onLongPress={handleLongPress}
/&gt;

// ✓ Each piece has one job
&lt;ListingCard listing={listing} onPress={handlePress} /&gt;
&lt;FavouriteBadge listingId={listing.id} /&gt;
&lt;FeaturedLabel /&gt;</code></pre>

<p>Each piece is independently testable, independently reusable, and independently updatable. Changing the favourite behaviour doesn't require touching <code>ListingCard</code> at all.</p>

<h2>Co-locate TypeScript Interfaces With the Component</h2>
<p>Keep the props interface in the same file as the component. A separate <code>types/</code> folder for component props adds indirection without benefit — when you update the component, you have to update two files instead of one.</p>

<pre><code>// ListingCard.tsx
interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    location: string;
  };
  onPress: (id: string) =&gt; void;
}

export function ListingCard({ listing, onPress }: ListingCardProps) {
  return (
    &lt;Pressable onPress={() =&gt; onPress(listing.id)}&gt;
      &lt;Card&gt;
        &lt;ListingImage uri={listing.imageUrl} /&gt;
        &lt;ListingDetails listing={listing} /&gt;
      &lt;/Card&gt;
    &lt;/Pressable&gt;
  );
}</code></pre>

<p>The interface is right next to the component. If the listing shape changes, the interface is the first thing you see when you open the file.</p>

<h2>When to Extract a Component</h2>
<p>The heuristic is the same regardless of framework: if you are about to copy and paste JSX, stop and ask whether it should be a component instead.</p>
<p>Extract it when:</p>
<ul>
  <li>The same JSX appears on more than one screen</li>
  <li>The block has a clear, nameable responsibility</li>
  <li>You want to test or update it in isolation</li>
</ul>
<p>Leave it inline when:</p>
<ul>
  <li>It only appears in one place and is unlikely to be reused</li>
  <li>Extracting it requires so many props that it becomes harder to read than the original</li>
  <li>The component is a one-liner that adds nothing by being named</li>
</ul>

<h2>The Payoff at Week Eight</h2>
<p>None of this feels significant on day one. The folder structure looks like overhead.</p>
<p>Week eight is when it pays off. The designer changes the card shadow across the entire app. In a well-structured project, you update <code>Card.tsx</code> once — every screen updates. In an unstructured project, you spend a morning finding every place a card was copied and hoping you didn't miss the one in the onboarding flow.</p>
<p>Build components like you are building a library — even when you are the only one using it. Future you, two months from now, will not remember which card was the "correct" one. The folder structure makes that question irrelevant.</p>

<p>If you are starting a React Native project and want to get the architecture right before writing the first screen, <a href="/#contact">get in touch</a>. The right structure at the start is far cheaper than refactoring it later.</p>
    `.trim(),
};

export default post;
