<?php

namespace App\Controller;

use App\Entity\Budget;
use App\Entity\Income;
use App\Repository\BudgetRepository;
use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/budget")
 */
class BudgetController extends AbstractController
{
    /**
     * @Route("/", name="app_budget_index", methods={"GET"})
     */
    public function index(BudgetRepository $budgetRepository): JsonResponse
    {
        $budgets = $budgetRepository->findAll();
        return $this->json($budgets, Response::HTTP_OK, [], ['groups' => 'budget']);
    }

    /**
     * @Route("/new", name="app_budget_new", methods={"POST"})
     */
    public function new(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $nomBudget = $data['nomBudget'] ?? null;
        $montantBudget = $data['montantBudget'] ?? null;
        $categories = $data['categories'] ?? null;

        if ($nomBudget === null || $montantBudget === null || $categories === null) {
            return new JsonResponse(['error' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $budget = new Budget();
        $budget->setNomBudget($nomBudget);
        $budget->setMontantBudget($montantBudget);
        $budget->setCategories($categories);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($budget);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Budget created successfully'], Response::HTTP_CREATED);
    }

   /**
     * @Route("/{id}", name="app_budget_show", methods={"GET"})
     */
    public function show(int $id, BudgetRepository $budgetRepository): JsonResponse
    {
        $budget = $budgetRepository->find($id);

        if (!$budget) {
            return new JsonResponse(['error' => 'Budget not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($budget, Response::HTTP_OK, [], ['groups' => 'budget']);
    }

    /**
     * @Route("/api/budgets/{name}", name="get_budget_by_name", methods={"GET"})
     */
    public function getBudgetByName(string $name, BudgetRepository $budgetRepository): JsonResponse
    {
        $budget = $budgetRepository->findOneByNomBudget($name);

        if (!$budget) {
            return new JsonResponse(['error' => 'Budget not found'], Response::HTTP_NOT_FOUND);
        }

        // You may want to serialize the budget data before returning it
        // Replace this with your serialization logic
        $data = [
            'id' => $budget->getId(),
            'nomBudget' => $budget->getNomBudget(),
            'montantBudget' => $budget->getMontantBudget(),
            'categories' => $budget->getCategories(),
            // Add more fields as needed
        ];

        return new JsonResponse($data);
    }

    /**
     * @Route("/{id}/edit", name="app_budget_edit", methods={"PUT"})
     */
    public function edit(Request $request, Budget $budget): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $nomBudget = $data['nomBudget'] ?? null;
        $montantBudget = $data['montantBudget'] ?? null;
        $categories = $data['categories'] ?? null;

        if ($nomBudget === null || $montantBudget === null || $categories === null) {
            return new JsonResponse(['error' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
        }

        $budget->setNomBudget($nomBudget);
        $budget->setMontantBudget($montantBudget);
        $budget->setCategories($categories);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return new JsonResponse(['message' => 'Budget updated successfully'], Response::HTTP_OK);
    }

    /**
     * @Route("/{id}", name="app_budget_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Budget $budget): JsonResponse
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($budget);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Budget deleted successfully'], Response::HTTP_OK);
    }









    /**
     * @Route("/budgets/{mois}", name="get_budgets_by_month")
     */
    public function getBudgetsByMonth(string $mois): Response
    {
        // Get Doctrine's entity manager
        $entityManager = $this->getDoctrine()->getManager();

        // Fetch the Income entity for the selected month
        $income = $entityManager->getRepository(Income::class)->findOneBy(['mois' => $mois]);

        // If income is not found, handle it (return a response, throw an exception, etc.)
        if (!$income) {
            throw $this->createNotFoundException('Income not found for the selected month');
        }

        // Get the Budgets associated with the income
        $budgets = $income->getBudgets();

        // You can return the budgets data in any format (JSON, HTML, etc.)
        // For example, let's return JSON
        $budgetsData = [];
        foreach ($budgets as $budget) {
            $budgetsData[] = [
                'id' => $budget->getId(),
                'nomBudget' => $budget->getNomBudget(),
                'montantBudget' => $budget->getMontantBudget(),
                'categories' => $budget->getCategories(),
                        ];
        }

        return $this->json($budgetsData);
    }






    
     /**
 * @Route("/api/getBudgets", name="get_montant_budget", methods={"GET"})
 */
public function getBudgets(BudgetRepository $budgetRepository , SerializerInterface $serializer): Response
{
    // Fetch all budgets with categories
    $budget = $budgetRepository->findAll();

 // Serialize using the 'budget' serialization group
 $data = $serializer->serialize($budget, 'json', ['groups' => 'budget']);

 return new JsonResponse($data, Response::HTTP_OK, [], true);
}










/**
     * @Route("/add", name="app_budget_new", methods={"POST"})
     */
    public function add(Request $request, BudgetRepository $budgetRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        // Assuming you're sending 'nomBudget', 'montantBudget', 'incomeId', and 'categories' from Angular
        $nomBudget = $data['nomBudget'] ?? null;
        $montantBudget = $data['montantBudget'] ?? null;
        $incomeId = $data['incomeId'] ?? null;
        $categories = $data['categories'] ?? null;
$income = $this->getDoctrine()->getRepository(Income::class)->find($incomeId);
        if (!$income) {
            // If the Income entity with the provided ID does not exist
            return new JsonResponse(['error' => 'Income not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        if ($nomBudget === null || $montantBudget === null || $incomeId === null || $categories === null) {
            // Invalid data received
            return new JsonResponse(['error' => 'Invalid data received'], Response::HTTP_BAD_REQUEST);
        }

        $budget = new Budget();
        $budget->setNomBudget($nomBudget);
        $budget->setMontantBudget($montantBudget);
        $budget->setIncome($income);
        $budget->setCategories($categories);

        // Persist the budget entity
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($budget);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Budget created successfully'], Response::HTTP_CREATED);
    }



/**
 * @Route("/add/{mois}", name="app_budget_add_with_month", methods={"POST"})
 */
public function addWithMonth(Request $request, string $mois): Response
{
    $data = json_decode($request->getContent(), true);

    // Retrieve data from the request body
    $nomBudget = $data['nomBudget'] ?? null;
    $montantBudget = $data['montantBudget'] ?? null;
    $categories = $data['categories'] ?? null;
   
    if ($nomBudget === null || $montantBudget === null || $categories === null) {
        return new JsonResponse(['error' => 'Missing required fields'], Response::HTTP_BAD_REQUEST);
    }

    $income = $this->getDoctrine()->getRepository(Income::class)->findOneBy(['mois' => $mois]);

    if (!$income) {
        return new JsonResponse(['error' => 'Income not found for the selected month'], Response::HTTP_NOT_FOUND);
    }

    $budget = new Budget();
    $budget->setNomBudget($nomBudget);
    $budget->setMontantBudget($montantBudget);
    $budget->setCategories($categories);
    $budget->setIncome($income);

    $entityManager = $this->getDoctrine()->getManager();
    $entityManager->persist($budget);
    $entityManager->flush();

    return new JsonResponse(['message' => 'Budget created successfully for month ' . $mois], Response::HTTP_CREATED);
}



/**
 * @Route("/{budgetId}/transactions", name="get_transactions_for_budget", methods={"GET"})
 */

public function showTransactionsForBudget(int $budgetId)
{
    $transactionUrl = $_ENV['Transaction_url'];
    // Send a GET request to the transaction project's API endpoint
    $httpClient = HttpClient::create();
    $response = $httpClient->request('GET',  $transactionUrl.'budgets/' . $budgetId);

    // Check if the request was successful
    if ($response->getStatusCode() === 200) {
        // Decode the JSON response
        $data = $response->toArray();

        // Return the transactions as JSON response
        return new JsonResponse($data);
    } else {
        // Handle the case when the request fails
        return new JsonResponse(['error' => 'Failed to fetch transactions'], $response->getStatusCode());
    }



}
}