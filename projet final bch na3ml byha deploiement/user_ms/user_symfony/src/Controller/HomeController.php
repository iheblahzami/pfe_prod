<?php

namespace App\Controller;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class HomeController extends AbstractController
{



    /**
     * @Route("/", name="app_user_index", methods={"GET"})
     */
    public function index(): JsonResponse
    {
        // Get the repository for the User entity
        $userRepository = $this->getDoctrine()->getRepository(User::class);

        // Fetch all users
        $users = $userRepository->findAll();

        // Serialize the users to JSON format
        $usersJson = $this->serializeUsers($users);

        // Return the users as JSON response
        return new JsonResponse($usersJson);
    }

    private function serializeUsers($users): array
    {
        $serializedUsers = [];

        // Serialize each user object to an array
        foreach ($users as $user) {
            $serializedUsers[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                // Add more fields if needed
            ];
        }

        return $serializedUsers;
    }










  /**
 * @Route("/login", name="app_login", methods={"POST"})
 */
public function login(Request $request, UserPasswordEncoderInterface $passwordEncoder, JWTTokenManagerInterface $jwtManager): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    // Find the user by their email address
    $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $data['email']]);

    // Check if the user exists and verify the password
    if (!$user || !$passwordEncoder->isPasswordValid($user, $data['password'])) {
        return new JsonResponse(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
    }

    // If the credentials are valid, generate and return a JWT token
    $token = $jwtManager->create($user);

    return new JsonResponse(['token' => $token]);
}


/**
     * @Route("/logout", name="app_logout", methods={"POST"})
     */
    public function logout(): JsonResponse
    {
        // Clear any session data, if necessary

        return new JsonResponse(['message' => 'Logout successful'], Response::HTTP_OK);
    }







 /**
     * @Route("/register", name="app_register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword(
            $userPasswordHasher->hashPassword(
                $user,
                $data['password']
            )
        );

        $entityManager->persist($user);
        $entityManager->flush();

        // You may want to perform additional actions here, such as sending an email
        
        return new JsonResponse(['message' => 'User registered successfully'], Response::HTTP_CREATED);
    }


}
